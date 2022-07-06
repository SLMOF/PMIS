using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Protocol_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.AsNoTracking().ToListAsync();
            return Ok(users);
        }  

        [HttpGet("{Id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x=>x.Id==id);
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> PostUser(CreateUserDTOs user)
        {
            if (user == null)
            {
                return BadRequest("User can not be Null");
            }

            var userData = new User()
            {
                FullName = user.FullName,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                UserName = user.UserName,
                RoleId = user.RoleId,
                Email = user.Email,
            };

            _context.Users.Add(userData);
            await _context.SaveChangesAsync();
            return Ok(userData);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateUser(int Id,CreateUserDTOs user)
        {
            var UpdatingUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == Id);

            if(UpdatingUser != null)
            {
                UpdatingUser.FullName= user.FullName;
                UpdatingUser.Email = user.Email;
                UpdatingUser.UserName = user.UserName;
                UpdatingUser.RoleId = user.RoleId;

                await _context.SaveChangesAsync();  
            }

            return Ok(UpdatingUser);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            var UpdatingUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == Id);

            if (UpdatingUser != null)
            {
                UpdatingUser.IsDeleted= true;
                await _context.SaveChangesAsync();
            }

            return Ok(UpdatingUser);

        }

    }
}
