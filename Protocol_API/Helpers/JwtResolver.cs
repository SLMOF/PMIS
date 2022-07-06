namespace Protocol_API.Helpers
{
    public class JwtResolver
    {
         private readonly IHttpContextAccessor _contextAccessor;

        public JwtResolver(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public int GetUserId()
        {
            if (!int.TryParse(_contextAccessor.HttpContext?.User?.FindFirstValue("Id"), out var userId))
            {
                Console.WriteLine("=======================");
                Console.WriteLine($"User Id is {userId}");
                Console.WriteLine("=======================");
                return 0;
            }

            Console.WriteLine("=======================");
            Console.WriteLine($"User Id is {userId} kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
            Console.WriteLine("=======================");
            return userId;
        }
        public string? GetUserRoleName() => _contextAccessor.HttpContext?.User?.FindFirstValue("roleName");
    }
}
