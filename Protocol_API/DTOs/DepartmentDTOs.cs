namespace Protocol_API.DTOs
{
    public class DepartmentDTOs
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int? CreatedById { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateDepartment
    {
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
