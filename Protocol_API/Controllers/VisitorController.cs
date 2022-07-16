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
        private readonly JwtResolver _jwtResolver;

        public VisitorController(AppDbContext context, JwtResolver jwtResolver)
        {
            _context = context;
            _jwtResolver = jwtResolver; 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Visitor>>> GetVisitors(RequestParams requestParams)
        {
            var query = _context.Visitors
                .Include(d=>d.Department)
                .AsNoTracking()
                .AsQueryable();

            if(_jwtResolver.GetUserRoleName() == "Admin")
            {
                query = query.IgnoreQueryFilters();
            }
            var result = await query.PaginateAsync(requestParams, HttpContext.RequestAborted);
            return Ok(result);
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
        public async Task<ActionResult> PostVisitor(CreateVisitorDTOs visitor)
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
                Status = visitor.Status.ToString(),
                VisitorCard = visitor.VisitorCard,
                Remarks = visitor.Remarks, 
                VisitorDate = visitor.VisitorDate,
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
        public async Task<ActionResult> UpdateVisitor(int Id, CreateVisitorDTOs visitor)
        {
            var updatingVisotor = await _context.Visitors.FirstOrDefaultAsync(v => v.Id == Id);

            if (updatingVisotor != null)
            {
                updatingVisotor.ExpectedDuration = visitor.ExpectedDuration;
                updatingVisotor.DepartmentId = visitor.DepartmentId;
                updatingVisotor.FullName = visitor.FullName;
                updatingVisotor.From = visitor.From;
                updatingVisotor.Host = visitor.Host;
                updatingVisotor.ImageURL = visitor.ImageURL;
                updatingVisotor.MeetingOffice = visitor.MeetingOffice;
                updatingVisotor.Purpose = visitor.Purpose;
                updatingVisotor.Phone = visitor.Phone;
                updatingVisotor.Status = visitor.Status.ToString();
                updatingVisotor.VisitorCard = visitor.VisitorCard;
                updatingVisotor.Remarks = visitor.Remarks;
                updatingVisotor.VisitorDate = visitor.VisitorDate;
                updatingVisotor.Gender = visitor.Gender;
                updatingVisotor.NationalId = visitor.NationalId;
                updatingVisotor.PersonAccompanying = visitor.PersonAccompanying;
                updatingVisotor.VisitType = visitor.VisitType;

                await _context.SaveChangesAsync();  
            }
            return Ok(updatingVisotor);
        }

        [HttpPut("delete/{Id}")]
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
