using MainTask.Controllers;
using MainTask.DAL;
using MainTask.DAL.Entities;
using MainTask.DAL.Extensions;
using MainTask.Models;
using MainTask.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace JWTAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly HttpClient httpClient;
        private readonly ApplicationDbContext _context;
        private readonly EmailSender emailSender;
        private readonly StudentsController studentsController;

        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, SignInManager<ApplicationUser> signInManager, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            this.signInManager = signInManager;
            httpClient = new HttpClient();
            _context = context;
            emailSender = new EmailSender();
            studentsController = new StudentsController(_context);
        }

        
        [HttpPost]
        [Route("facebook")]
        [AllowAnonymous]
        public async Task<IActionResult> Facebook(FacebookUserModel facebookUserModel)
        {
            var url = "https://graph.facebook.com/me?access_token=" + facebookUserModel.AccessToken;
            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, url);
            HttpResponseMessage response = await httpClient.SendAsync(requestMessage);
            if(response.StatusCode == HttpStatusCode.OK)
            {
                var userExists = await userManager.FindByNameAsync(facebookUserModel.Email);
                if (userExists == null)
                {
                    var facebookRegister = new RegisterModel()
                    {
                        Username = facebookUserModel.Email,
                        Email = facebookUserModel.Email,
                    };
                    await RegisterFacebook(facebookRegister, facebookUserModel);
                }
                var facebookLogin = new LoginModel()
                {
                    Username = facebookUserModel.Email,
                };

                return await LoginFacebook(facebookLogin);
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password) && user.EmailConfirmed == true)
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.UtcNow.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                var currentUserRole = userRoles[0];

                return Ok(new
                {
                    uName = model.Username,
                    role = currentUserRole,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });;
            }
            return Unauthorized();
        }

        private async Task<IActionResult> LoginFacebook(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null)
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.UtcNow.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                var currentUserRole = userRoles[0];

                return Ok(new
                {
                    uName = model.Username,
                    role = currentUserRole,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                }); ;
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }  

            if (await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }

            var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var linkToConfirmEmail = "https://localhost:44339/api/authenticate/confirmemail?token=" + HttpUtility.UrlEncode(code) + "&username=" + user.UserName;
            await emailSender.SendEmailAsync(user.Email, "Confirm Email", linkToConfirmEmail);

            return StatusCode(StatusCodes.Status200OK);
        }
        private async Task<IActionResult> RegisterFacebook(RegisterModel model, FacebookUserModel facebookUserModel)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }

            if (await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            await AddNewStudent(user.Email, user.UserName);

            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            }
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            await AddNewStudent(user.Email, user.UserName);

            return StatusCode(StatusCodes.Status200OK);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("confirmemail")]
        public async Task<String> ConfirmEmail(string Token, string Username)
        {
            var user = await userManager.FindByNameAsync(Username);
            if (user != null)
            {
                var checkConfirm = await userManager.ConfirmEmailAsync(user, Token);
                await AddNewStudent(user.Email, user.UserName);
                return "Email CONFIRMED";

            }
            else
            {
                return "Email NOT CONFIRMED";
            }
        }

        public async Task AddNewStudent(string email, string username)
        {
            var studentModel = new Student()
            {
                UserName = username,
                Email = email
            };

            await studentsController.PostStudent(studentModel);
        }
    }
}