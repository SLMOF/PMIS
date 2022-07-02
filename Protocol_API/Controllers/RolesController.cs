using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Protocol_API.Entities;

namespace Protocol_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RolesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            var roles = await _context.Roles.AsNoTracking().ToListAsync();
            return Ok(roles);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Role>> GetRole(int id)
        {
            var role = await _context.Roles.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> PostRole([FromBody] CreateRolesDTROs role)
        {
            if (role == null)
            {
                Logger.LogInfo("Role is ull");
                return BadRequest("Role can not be Null");
            }

            var roleData = new Role()
            {
                Name = role.Name,
                Permissions=role.Permissions,
                Description = role.Description,
            };

            _context.Roles.Add(roleData);
            await _context.SaveChangesAsync();
            return Ok(roleData);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateRole(int Id, CreateRolesDTROs role)
        {
            var updatingRole = await _context.Roles.FirstOrDefaultAsync(r => r.Id == Id);

            if (updatingRole != null)
            {
                updatingRole.Name = role.Name;
                updatingRole.Permissions = role.Permissions;
                updatingRole.Description = role.Description;

                await _context.SaveChangesAsync();
            }
            return Ok(updatingRole);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> DeleteRole(int Id)
        {
            var dleetingRole = await _context.Roles.FirstOrDefaultAsync(u => u.Id == Id);

            if (dleetingRole != null)
            {
                dleetingRole.IsDeleted = true;
                await _context.SaveChangesAsync();
            }

            return Ok(dleetingRole);

        }

    }
}
