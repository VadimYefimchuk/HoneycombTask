using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MainTask.DAL;
using MainTask.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using MainTask.Models.Auth;
using PagedList;

namespace MainTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        public async Task<ActionResult<ResponceDataPage<IEnumerable<Student>>>> GetStudents(int start, int length)
        {
            var stud = await _context.Students
                .Skip(start)
                .Take(length)
                .Include(w => w.Courses)
                .ToListAsync();

            var count = _context.Students.Count();

            return new ResponceDataPage<IEnumerable<Student>>(){
                count = count,
                data = stud
            };
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("Search")]
        public async Task<ActionResult<ResponceDataPage<IEnumerable<Student>>>> GetSearchStudents(SearchSettings searchSettings)
        {

            var students = _context.Students.Include(w => w.Courses).AsQueryable();

            if (!String.IsNullOrEmpty(searchSettings.SearchString))
            {
                searchSettings.SearchString = searchSettings.SearchString.ToLower();
                students = students.Where(x =>
                                        x.Id.ToString().ToLower().Contains(searchSettings.SearchString) ||
                                        x.Name.ToLower().Contains(searchSettings.SearchString) ||
                                        x.LastName.ToLower().Contains(searchSettings.SearchString) ||
                                        x.Email.ToLower().Contains(searchSettings.SearchString) ||
                                        x.Age.ToString().ToLower().Contains(searchSettings.SearchString) ||
                                        x.RegisteredDate.ToString().ToLower().Contains(searchSettings.SearchString) ||
                                        x.StudyDate.ToString().ToLower().Contains(searchSettings.SearchString)
                                        );
            }
            //Paste here
            students = await ApplySorting(students, searchSettings.SortOrder, searchSettings.SortField);

            return new ResponceDataPage<IEnumerable<Student>>() { 
                count = students.Count(),
                data = students.ToPagedList(searchSettings.CurrentPage, searchSettings.PageSize)
            };
        }

        // GET: api/Students/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        [Authorize]
        [HttpGet("SearchEmail")]
        public async Task<ActionResult<Student>> SearchEmail(string username)
        {
            var student = await _context.Students
                .Where(x => x.UserName == username)
                .FirstOrDefaultAsync();

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPut("{idCurrentUser}")]
        public async Task<IActionResult> PutStudent(int idCurrentUser, Student student)
        {
            if (idCurrentUser != student.Id)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(idCurrentUser))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Students
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            student.RegisteredDate = DateTime.UtcNow;
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return student;
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }

        async private Task<IQueryable<Student>> ApplySorting(IQueryable<Student> data, string sortOrder, string sortField)
        {
            if (sortOrder == "ascend")
            {
                switch (sortField)
                {
                    case "id":
                        return data = data.OrderBy(s => s.Id);
                    case "name":
                        return data = data.OrderBy(s => s.Name);
                    case "lastName":
                        return data = data.OrderBy(s => s.LastName);
                    case "age":
                        return data = data.OrderBy(s => s.Age);
                    case "email":
                        return data = data.OrderBy(s => s.Email);
                    case "registeredDate":
                        return data = data.OrderBy(s => s.RegisteredDate);
                    case "studyDate":
                        return data = data.OrderBy(s => s.StudyDate);
                    default:
                        return data;
                }
            }
            else if (sortOrder == "descend")
            {
                switch (sortField)
                {
                    case "id":
                        return data = data.OrderByDescending(s => s.Id);
                    case "name":
                        return data = data.OrderByDescending(s => s.Name);
                    case "lastName":
                        return data = data.OrderByDescending(s => s.LastName);
                    case "age":
                        return data = data.OrderByDescending(s => s.Age);
                    case "email":
                        return data = data.OrderByDescending(s => s.Email);
                    case "registeredDate":
                        return data = data.OrderByDescending(s => s.RegisteredDate);
                    case "studyDate":
                        return data = data.OrderByDescending(s => s.StudyDate);
                    default:
                        return data;
                }
            }
            return data;

        }
    }
}
