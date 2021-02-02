using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.DAL.Extensions
{
    public static class ValidatorExtensions
    {
        public static bool BeAValidDate(DateTime date)
        {
            return !date.Equals(default(DateTime));
        }
    }
        
}

