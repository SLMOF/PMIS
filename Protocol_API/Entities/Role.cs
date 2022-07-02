namespace Protocol_API.Entities
{
    public class Role : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Permissions { get; set; }
    }
}
