using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Protocol_API.Helpers;

namespace Protocol_API.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly AppDbContext _context;
        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }
        // GET: DepartmentController
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments(RequestParams requestParams)
        {
            var query = await _context.Departments.AsNoTracking().PaginateAsync(requestParams, HttpContext.RequestAborted);
            return Ok(query);  
        }

        // GET: DepartmentController/5
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d=>d.Id==id);
            return Ok(department);  
        }

        [HttpPost]
        public async Task<IActionResult> PostDepartment(DepartmentDTOs department)
        {
            if (department == null)
            {
                Logger.LogInfo("Role is ull");
                return BadRequest("Role can not be Null");
            }

            var departmentData = new Department()
            {
                Name = department.Name, 
                Description = department.Description,   
            };

            _context.Departments.Add(departmentData);
            await _context.SaveChangesAsync();
            return Ok(departmentData);

        }



        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateDepartment(int Id, DepartmentDTOs department)
        {
            var updatingDepartment = await _context.Departments.FirstOrDefaultAsync(r => r.Id == Id);

            if (updatingDepartment != null)
            {
                updatingDepartment.Name = department.Name;
                updatingDepartment.Description = department.Description;

                await _context.SaveChangesAsync();
            }
            return Ok(updatingDepartment);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> DeleteDepartment(int Id)
        {
            var deletingDepartment= await _context.Departments.FirstOrDefaultAsync(u => u.Id == Id);

            if (deletingDepartment != null)
            {
                deletingDepartment.IsDeleted = true;
                await _context.SaveChangesAsync();
            }

            return Ok(deletingDepartment);

        }
    }
}
