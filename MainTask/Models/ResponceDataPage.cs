using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.DAL.Entities
{
    public class ResponceDataPage<T>
    {
        public int count { get; set; }
        public T data { get; set; }
    }
}
