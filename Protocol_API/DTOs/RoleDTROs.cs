namespace Protocol_API.DTOs
{
    public class RoleDTROs
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Permissions { get; set; }
    }

    public class CreateRolesDTROs
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<string> Permissions { get; set; }
    }
}
