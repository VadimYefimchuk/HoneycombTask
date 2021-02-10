using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MainTask.Models
{
    public class FacebookUserModel
    {
        public string AccessToken { get; set; }
        public string Email { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Id { get; set; }
        public string UserID { get; set; }
        public string SignedRequest { get; set; }
        public string GraphDomain { get; set; }
        public int Data_access_expiration_time { get; set; }
        public int ExpiresIn { get; set; }

    }
}
