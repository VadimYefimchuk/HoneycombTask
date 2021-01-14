using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainTask.Models;

namespace MainTask.Data
{
    public class DbInitializer
    {
        public static void Initialize(UserContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var students = new User[]
            {
            new User{Name = "Tom", Age = 331, Email = "wefwe@@", Password = "323"},
            new User{Name = "Tom", Age = 332, Email = "@@", Password = "324"},
            new User{Name = "Tom", Age = 333, Email = "wefwef@@", Password = "328"},
            new User{Name = "Towefwefm", Age = 334, Email = "@@", Password = "325"},
            new User{Name = "Tom", Age = 335, Email = "@@", Password = "324"},
            new User{Name = "Twefwefom", Age = 336, Email = "wefewf@@", Password = "325"},
            new User{Name = "Tom", Age = 337, Email = "@@", Password = "332"},
            new User{Name = "Tom", Age = 338, Email = "@@", Password = "342"},
            };
            foreach (User s in students)
            {
                context.Users.Add(s);
            }
            context.SaveChanges();

        }
    }
}
