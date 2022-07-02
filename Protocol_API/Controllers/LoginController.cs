

namespace Protocol_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly AppDbContext _context;
        public LoginController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTOs userLogin)
        {
            try
            {
                var user = Authenticate(userLogin);


                if (user != null)
                {
                    string token = Generate(user);
                    return Ok(new { token = token });
                }
                return BadRequest("Incorrect UserName or Password!");
            }
            catch (Exception ex)
            {
                Logger.LogError(ex);
                return BadRequest("Incorrect UserName or Password!");
            }
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("userName", user.UserName),
                new Claim("email", user.Email),
                new Claim("fullName", user.FullName),
                new Claim("roleId", user.RoleId.ToString()),
                new Claim("Id", user.Id.ToString()),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
               _config["Jwt:Audience"],
               claims,
               expires: DateTime.Now.AddMinutes(60),
               signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public User Authenticate(LoginDTOs userLogin)
        {
            var currentUser = _context.Users.FirstOrDefault(o => o.UserName.ToLower() ==
            userLogin.UserName.ToLower());
            if (currentUser != null)
            {
                bool isValidPassword = BCrypt.Net.BCrypt.Verify(userLogin.Password, currentUser.Password);
                if (isValidPassword)
                {
                    return currentUser;
                }
            }

            return null;
        }
    }
}
