using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainTask.DAL.Entities;

namespace MainTask.Models
{
    public class EmailViewModel
    {
        public StudentsCourse StudentsCourse { get; set; }
        public int? DayToStart { get; set; }
    }
}
