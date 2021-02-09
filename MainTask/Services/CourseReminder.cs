using Hangfire;
using MainTask.Controllers;
using MainTask.DAL;
using MainTask.DAL.Entities;
using MainTask.DAL.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MainTask.Models;

namespace MainTask.Services
{
    public class CourseReminder : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IViewRenderService _viewRenderService;

        const string emailTheme = "Course Reminder";

        const int dayToStart = 1 ;
        const int weekToStart = 7 ;
        const int monthToStart = 30 ;
        public CourseReminder(ApplicationDbContext context, IViewRenderService viewRenderService)
        {
            _context = context;
            _viewRenderService = viewRenderService;
        }

        public async Task DeleteCourseEmailReminder(StudentsCourse studentCourseJob)
        {
            var findJobList = await _context.StudentCourseJobs
                .Where(x => x.StudentId == studentCourseJob.StudentId)
                .Where(x => x.CourseId == studentCourseJob.CourseId)
                .ToListAsync();
            if (findJobList.Count > 0 )
            {
                foreach (var findJob in findJobList)
                {
                    _context.StudentCourseJobs.Remove(findJob);
                    BackgroundJob.Delete(findJob.JobId);
                }
                
            }
            await _context.SaveChangesAsync();
        }

        public async Task CourseEmailReminder(StudentsCourse studentsCourse)
        {
            if (DateTime.Compare(DateTime.UtcNow, studentsCourse.StartDate.AddDays(- dayToStart)) <= 0)
            {
                var jobId = BackgroundJob.Schedule<EmailSender>(service => service.SendEmailAsync(studentsCourse.Student.Email, emailTheme,
                    GenerateEmailMessage(studentsCourse, dayToStart).Result.ToString()), studentsCourse.StartDate.AddDays(-1).Date + new TimeSpan(8, 0, 0));

                AddStudentCourseJob(studentsCourse, jobId);
            }

            if (DateTime.Compare(DateTime.UtcNow, studentsCourse.StartDate.AddDays(- weekToStart)) <= 0)
            {
                var jobId = BackgroundJob.Schedule<EmailSender>(service => service.SendEmailAsync(studentsCourse.Student.Email, emailTheme,
                    GenerateEmailMessage(studentsCourse, weekToStart).Result.ToString()), studentsCourse.StartDate.AddDays(-7));

                AddStudentCourseJob(studentsCourse, jobId);
            }

            if (DateTime.Compare(DateTime.UtcNow, studentsCourse.StartDate.AddDays(- monthToStart)) <= 0)
            {
                var jobId = BackgroundJob.Schedule<EmailSender>(service => service.SendEmailAsync(studentsCourse.Student.Email, emailTheme,
                    GenerateEmailMessage(studentsCourse, monthToStart).Result.ToString()), studentsCourse.StartDate.AddDays(-30));

                AddStudentCourseJob(studentsCourse, jobId);
            }

            await _context.SaveChangesAsync();

        }

        public void AddStudentCourseJob(StudentsCourse studentsCourse, string jobId)
        {
            _context.StudentCourseJobs.Add(new StudentCourseJob
            {
                StudentId = studentsCourse.StudentId,
                CourseId = studentsCourse.CourseId,
                JobId = jobId,
            });
        }

        public async Task<string> GenerateEmailMessage(StudentsCourse studentsCourse, int dayToStart)
        {
            var viewModel = new EmailViewModel
            {
                StudentsCourse = studentsCourse,
                DayToStart = dayToStart
            };

            var result = await _viewRenderService.RenderToStringAsync("EmailPrototype", viewModel);
            return result;
        }
    }
}
