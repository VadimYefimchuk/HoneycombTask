using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MainTask.DAL.Entities;

namespace MainTask.DAL.Validators
{
    public class CoursesValidator : AbstractValidator<Course>
    {
    }
}
