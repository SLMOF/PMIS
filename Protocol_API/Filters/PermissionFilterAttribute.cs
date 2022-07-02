using Microsoft.AspNetCore.Mvc.Filters;
using Protocol_API.DATA;

namespace Protocol_API.Filters
{
    public class PermissionFilterAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly string _permission;

        public PermissionFilterAttribute(string permission)
        {
            _permission = permission;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<AppDbContext>();

            if (!int.TryParse(context.HttpContext.User.FindFirstValue("roleId"), out var roleId))
            {
                context.Result = new ForbidResult();
                return;
            }

            var role = await dbContext.Roles.FirstOrDefaultAsync(r => r.Id == roleId, context.HttpContext.RequestAborted);
            if (role is null)
            {
                context.Result = new ForbidResult();
                return;
            }

            if (!role.Permissions.Contains(_permission))
            {
                context.Result = new ForbidResult();
                return;
            }

        }
    }
}
