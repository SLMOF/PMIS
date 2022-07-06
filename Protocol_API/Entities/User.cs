namespace Protocol_API.Entities
{
    public class User : Entity
    {
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTimeOffset UpdatedAt { get; set; }
        public long RoleId { get; set; }
        public Role Role { get; set; } = null!;
    }
}
