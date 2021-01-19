using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.DAL.Entities
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        [MaxLength(20)]
        public string? Name{ get; set; }
        [MaxLength(20)]
        public string? LastName{ get; set; }
        [MaxLength(3)]
        public uint? Age{ get; set; }
        public DateTime? RegisteredDate{ get; set; }
        public DateTime? StudyDate{ get; set; }

    }
}
