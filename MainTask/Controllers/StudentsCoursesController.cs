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
using MainTask.Services;

namespace MainTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsCoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly CourseReminder courseReminder;

        public StudentsCoursesController(ApplicationDbContext context, IViewRenderService viewRenderService)
        {
            _context = context;
            courseReminder = new CourseReminder(context, viewRenderService);
        }

        // GET: api/StudentsCourses
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentsCourse>>> GetStudentsCourses()
        {
            return await _context.StudentsCourses.ToListAsync();
        }

        // GET: api/StudentsCourses/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentsCourse>> GetStudentsCourse(int id)
        {
            var studentsCourse = await _context.StudentsCourses.FindAsync(id);

            if (studentsCourse == null)
            {
                return NotFound();
            }

            return studentsCourse;
        }

        // PUT: api/StudentsCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentsCourse(int id, StudentsCourse studentsCourse)
        {
            var findStudentsCourse = await _context.StudentsCourses
                .Where(x => x.CourseId == studentsCourse.CourseId)
                .Where(x => x.StudentId == studentsCourse.StudentId)
                .Include(x => x.Student)
                .Include(x => x.Course)
                .FirstOrDefaultAsync();

            if (findStudentsCourse == null)
            {
                await PostStudentsCourse(studentsCourse);
                return Ok(new Response { Status = "Success", Message = "Registration is successfully!" });
            }
                        
            findStudentsCourse.StartDate = studentsCourse.StartDate;

            await courseReminder.DeleteCourseEmailReminder(findStudentsCourse);
            await courseReminder.CourseEmailReminder(findStudentsCourse);

            _context.Entry(findStudentsCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentsCourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new Response { Status = "Success", Message = "Date updated successfully!" });
        }

        // POST: api/StudentsCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<StudentsCourse>> PostStudentsCourse(StudentsCourse studentsCourse)
        {
            _context.StudentsCourses.Add(studentsCourse);
            await _context.SaveChangesAsync();
            
            var thisCourse = await _context.StudentsCourses
                .Where(x => x.CourseId == studentsCourse.CourseId)
                .Where(x => x.StudentId == studentsCourse.StudentId)
                .Include(x => x.Student)
                .Include(x => x.Course)
                .FirstOrDefaultAsync();
            await courseReminder.CourseEmailReminder(thisCourse);
            return CreatedAtAction("GetStudentsCourse", new { id = studentsCourse.Id }, studentsCourse);
        }

        // DELETE: api/StudentsCourses/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentsCourse>> DeleteStudentsCourse(int id)
        {
            var studentsCourse = await _context.StudentsCourses.FindAsync(id);
            if (studentsCourse == null)
            {
                return NotFound();
            }
            await courseReminder.DeleteCourseEmailReminder(studentsCourse);
            _context.StudentsCourses.Remove(studentsCourse);
            await _context.SaveChangesAsync();

            return studentsCourse;
        }

        private bool StudentsCourseExists(int id)
        {
            return _context.StudentsCourses.Any(e => e.Id == id);
        }
    }
}
