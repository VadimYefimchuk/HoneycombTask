﻿using System;

namespace MainTask.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string? LastName { get; set; }
        public int? Age { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public DateTime? RegisteredDate  { get; set; }
        public DateTime? StudyDate { get; set; }

    }
}
