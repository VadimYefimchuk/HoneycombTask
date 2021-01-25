using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.DAL.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }


    }
}
