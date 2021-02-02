using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MainTask.DAL.Entities;
using MainTask.DAL.Extensions;

namespace MainTask.DAL.Validators
{
    public class StudentValidator : AbstractValidator<Student>
    {
        public StudentValidator()
        {
            RuleFor(student => student.Email).NotNull().EmailAddress(); ;
            RuleFor(student => student.UserName).NotNull();

            RuleFor(student => student.Age).InclusiveBetween(1, 100);
        }
    }
}
