namespace Protocol_API.DTOs
{
    public class UserDTOs
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public int? RoleId { get; set; }
        public virtual RoleDTROs? Role { get; set; }
    }
    public class CreateUserDTOs
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public int? RoleId { get; set; }
    }
}
