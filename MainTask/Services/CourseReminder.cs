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

namespace MainTask.Services
{
    public class CourseReminder
    {
        private readonly ApplicationDbContext _context;

        public CourseReminder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task DeleteCourseEmailReminder(StudentsCourse studentCourseJob)
        {
            var findJobList = await _context.StudentCourseJobs
                .Where(x => x.StudentId == studentCourseJob.StudentId)
                .Where(x => x.CourseId == studentCourseJob.CourseId)
                .ToListAsync();
            if (findJobList != null)
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
            if (DateTime.Compare(DateTime.UtcNow, (studentsCourse.StartDate.AddDays(-1) + new TimeSpan(8, 0, 0))) <= 0)
            {
                var jobId = BackgroundJob.Schedule<EmailSender>(service => service.SendEmailAsync(studentsCourse.Student.Email, "Reminder",
                    $"Dear {studentsCourse.Student.Name}, we inform you that the course '{studentsCourse.Course.CourseName}' will start in the day," +
                    $" {studentsCourse.StartDate}"), studentsCourse.StartDate.AddDays(-1).Date + new TimeSpan(8, 0, 0));

                _context.StudentCourseJobs.Add(new StudentCourseJob
                {
                    Id = 0,
                    StudentId = studentsCourse.StudentId,
                    CourseId = studentsCourse.CourseId,
                    JobId = jobId,
                    DaysToStart = 1
                });
            }

            if (DateTime.Compare(DateTime.UtcNow, studentsCourse.StartDate.AddDays(-7)) <= 0)
            {
                var jobId = BackgroundJob.Schedule<EmailSender>(service => service.SendEmailAsync(studentsCourse.Student.Email, "Reminder",
                    $"Dear {studentsCourse.Student.Name}, we inform you that the course '{studentsCourse.Course.CourseName}' will start in 7 days," +
                    $" {studentsCourse.StartDate}"), studentsCourse.StartDate.AddDays(-7));

                _context.StudentCourseJobs.Add(new StudentCourseJob
                {
                    Id = 0,
                    StudentId = studentsCourse.StudentId,
                    CourseId = studentsCourse.CourseId,
                    JobId = jobId,
                    DaysToStart = 7
                });
            }

            if (DateTime.Compare(DateTime.UtcNow, studentsCourse.StartDate.AddDays(-30)) <= 0)
            {
                var jobId = BackgroundJob.Schedule<EmailSender>(service => service.SendEmailAsync(studentsCourse.Student.Email, "Reminder",
                    $"Dear {studentsCourse.Student.Name}, we inform you that the course '{studentsCourse.Course.CourseName}' will start in 30 days," +
                    $" {studentsCourse.StartDate}"), studentsCourse.StartDate.AddDays(-30));

                _context.StudentCourseJobs.Add(new StudentCourseJob
                {
                    Id = 0,
                    StudentId = studentsCourse.StudentId,
                    CourseId = studentsCourse.CourseId,
                    JobId = jobId,
                    DaysToStart = 30
                });
            }

            await _context.SaveChangesAsync();

        }
    }
}
