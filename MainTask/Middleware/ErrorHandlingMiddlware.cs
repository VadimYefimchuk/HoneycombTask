using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using NLog;
using System;
using System.Globalization;
using System.Threading.Tasks;

namespace MainTask.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Logger logger;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
            this.logger = LogManager.GetCurrentClassLogger();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try 
            { 
                await _next(context); 
            }
            catch (Exception exception) 
            {
                logger.Error(exception.Message);
            }
        }
    }
}