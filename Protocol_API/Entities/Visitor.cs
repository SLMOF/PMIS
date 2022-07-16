namespace Protocol_API.Entities
{
    public class Visitor:Entity
    {
        public string Host { get; set; }
        public string? From { get; set; }
        public string FullName { get; set; }
        public string? NationalId { get; set; }
        public string? VisitType { get; set; }
        public string? ExpectedDuration { get; set; }
        public string? MeetingOffice { get; set; }
        public string? PersonAccompanying { get; set; }
        public string? Purpose { get; set; }
        public string? Remarks { get; set; }
        public string? Gender { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
        public string? VisitorCard { get; set; }
        public DateTime VisitorDate { get; set; }
        public string? ImageURL { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}
