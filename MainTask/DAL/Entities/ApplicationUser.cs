using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace MainTask.DAL.Entities
{
    public class ApplicationUser: IdentityUser
    {
        public Student Student { get; set; }
    }
}
