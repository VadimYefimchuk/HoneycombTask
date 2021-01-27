using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.DAL.Entities
{
    public class SearchSettings
    {
        public string? SortOrder { get; set; }
        public string? CurrentFilter { get; set; }
        public string? SearchString { get; set; }
        public string? SortField { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
