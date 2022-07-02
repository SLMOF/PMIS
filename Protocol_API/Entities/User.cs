namespace Protocol_API.Entities
{
    public class User : Entity
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public int? RoleId { get; set; }
        public virtual Role? Role { get; set; }
    }
}
