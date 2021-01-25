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
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
           var stud = await _context.Students
                .Include(w => w.Courses)
                .ToListAsync();
            return stud;
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Student>>> GetSearchStudents(string query)
        {
            var stud = await _context.Students
                 .Where(x =>
                 x.Id.ToString().Contains(query) ||
                 x.Name.Contains(query) ||
                 x.LastName.Contains(query) ||
                 x.Email.Contains(query) ||
                 x.Age.ToString().Contains(query) ||
                 x.RegisteredDate.ToString().Contains(query) ||
                 x.StudyDate.ToString().Contains(query)
                 )
                 .Include(w => w.Courses)
                 .ToListAsync();
            return stud;
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
    }
}
