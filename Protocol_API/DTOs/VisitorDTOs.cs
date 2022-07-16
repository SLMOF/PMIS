namespace Protocol_API.DTOs
{
    public class VisitorDTOs
    {
        public int Id { get; set; }
        public string Host { get; set; }
        public string? From { get; set; }
        public string FullName { get; set; }
        public string? NationalId { get; set; }
        public string VisitType { get; set; }
        public string ExpectedDuration { get; set; }
        public string MeetingOffice { get; set; }
        public string PersonAccompanying { get; set; }
        public string Purpose { get; set; }
        public string? Remarks { get; set; }
        public string? Gender { get; set; }
        public string? ImageURL { get; set; }
        public int? DepartmentId { get; set; }
        public DepartmentDTOs? Department { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime VisitorDate { get; set; }

    }

    public class CreateVisitorDTOs
    {
        public string Host { get; set; }
        public string? From { get; set; }
        public string FullName { get; set; }
        public DateTime VisitorDate { get; set; }
        public string? NationalId { get; set; }
        public string VisitType { get; set; }
        public string ExpectedDuration { get; set; }
        public string? Gender { get; set; }
        public string MeetingOffice { get; set; }
        public VisitorStatus? Status { get; set; } = VisitorStatus.Pending;
        public string PersonAccompanying { get; set; }
        public string Purpose { get; set; }
        public string? Remarks { get; set; }
        public string? VisitorCard { get; set; }
        public string Phone { get; set; }
        public string? ImageURL { get; set; }
        public int? DepartmentId { get; set; }
    }
}
