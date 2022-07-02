using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Protocol_API.Helpers;

namespace Protocol_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorController : ControllerBase
    {
        private readonly AppDbContext _context;
        public VisitorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Visitor>>> GetVisitors(RequestParams requestParams)
        {
            var query = await _context.Visitors
                .AsNoTracking()
                .Include(d=>d.Department)
                .PaginateAsync(requestParams, HttpContext.RequestAborted);

            return Ok(query);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Visitor>> GetVisitor(int Id)
        {
            var query = await _context.Visitors
                .AsNoTracking()
               .FirstOrDefaultAsync(v => v.Id == Id);

            return Ok(query);
        }

        [HttpPost]
        public async Task<ActionResult> PostVisitor(Visitor visitor)
        {
            if (visitor == null)
            {
                return BadRequest("Visotor can not be Null");
            }

            var newVisitor = new Visitor()
            {
                ExpectedDuration = visitor.ExpectedDuration,
                DepartmentId = visitor.DepartmentId,
                FullName = visitor.FullName,
                From = visitor.From,
                Host = visitor.Host,
                ImageURL = visitor.ImageURL,
                MeetingOffice = visitor.MeetingOffice,
                Purpose = visitor.Purpose,
                Phone = visitor.Phone,  
                Remarks = visitor.Remarks, 
                Gender = visitor.Gender,
                NationalId = visitor.NationalId,
                PersonAccompanying = visitor.PersonAccompanying,
                VisitType = visitor.VisitType,
            };
            _context.Visitors.Add(newVisitor);
            await _context.SaveChangesAsync();
            return Ok(newVisitor);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> UpdateVisitor(int Id, Visitor visitor)
        {
            var updatingVisotor = await _context.Visitors.AsNoTracking().FirstOrDefaultAsync(v => v.Id == Id);

            if (updatingVisotor != null)
            {
                updatingVisotor.FullName = visitor.FullName;
                updatingVisotor.From = visitor.From;
                updatingVisotor.Host = visitor.Host;
                updatingVisotor.Host = visitor.Host;
                updatingVisotor.Remarks = visitor.Remarks;
                updatingVisotor.NationalId = visitor.NationalId;
                updatingVisotor.PersonAccompanying = visitor.PersonAccompanying;
                updatingVisotor.VisitType = visitor.VisitType;
                updatingVisotor.Gender = visitor.Gender;
                updatingVisotor.Purpose = visitor.Purpose;
                updatingVisotor.MeetingOffice = visitor.MeetingOffice;
                updatingVisotor.ImageURL = visitor.ImageURL;
                updatingVisotor.DepartmentId = visitor.DepartmentId;

                await _context.SaveChangesAsync();  
            }
            return Ok(updatingVisotor);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> DeleteVisitorVisitor(int Id)
        {
            var deletingVisitor = await _context.Visitors.AsNoTracking().FirstOrDefaultAsync(v => v.Id == Id);

            if (deletingVisitor != null)
            {
                deletingVisitor.IsDeleted = true;

                await _context.SaveChangesAsync();
            }
            return Ok(deletingVisitor);
        }
    }
}
