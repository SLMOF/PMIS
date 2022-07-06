

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Protocol_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly AppDbContext _context;
        private User? _user;
        public LoginController( AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;   
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTOs userLogin)
        {
            if (userLogin == null)
            {
                return BadRequest("Object sent from client is null");
            }
            try
            {
                
                if (!await Authenticate(userLogin))
                {
                    return Unauthorized();
                }
                return Ok(new { Token = CreateToken() });
            }
            catch (Exception ex)
            {
                Logger.LogError(ex);
                return BadRequest("Incorrect UserName or Password!");
            }
        }

        private string CreateToken()
        {
            var signingCredentials = GetSigningCredentials();

            var claims = GetClaims();

            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private List<Claim> GetClaims()
        {
            if (_user == null)
            {
                return new List<Claim>();
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, _user.UserName),
                new Claim("Id", _user.Id.ToString()),
                new Claim("fullName", _user.FullName),
                new Claim("email", _user.Email),
                new Claim("username", _user.UserName),
                new Claim("roleName", _user.Role.Name),
            };

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            //var tokenOptions = new JwtSecurityToken(
            //    issuer: _config["Jwt:Issuer"],
            //    audience: _config["Jwt:Audience"],
            //    claims: claims,
            //    expires: DateTime.Now.AddHours(9),
            //    signingCredentials: signingCredentials);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
             _config["Jwt:Audience"],
             claims,
             expires: DateTime.Now.AddMinutes(60),
             signingCredentials: signingCredentials);

            return token;
        }
    

        public async Task<bool> Authenticate(LoginDTOs userLogin)
        {
            _user = _context.Users.IgnoreQueryFilters().Include(r=>r.Role).FirstOrDefault(o => o.UserName.ToLower() ==
            userLogin.UserName.ToLower());

            if (_user != null)
            {
                bool isValidPassword = BCrypt.Net.BCrypt.Verify(userLogin.Password, _user.Password);
                if (isValidPassword)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
