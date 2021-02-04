using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.DAL.Entities
{
    public class StudentCourseJob
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public string JobId { get; set; }

        public int DaysToStart { get; set; }
    }
}
