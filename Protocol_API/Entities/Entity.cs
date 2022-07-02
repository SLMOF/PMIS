namespace Protocol_API.Entities
{
    public class Entity
    {
        public long Id { get; set; }
        public int? CreatedById { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
