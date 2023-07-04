using AutoMapper;
using EventManagementTool.Data;
using EventManagementTool.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EventManagementToolDbContext _context;
        private readonly IMapper _mapper;
        public EmployeeController(EventManagementToolDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDto>> GetEmployee(string id)
        {
            var employee = await _context.Employees.FindAsync(id);
            Console.WriteLine("employee controller username" + employee.UserName);
           
            Console.WriteLine(employee.ToString());
            var result  = _mapper.Map<ResponseDto>(employee);
            result.UserName = employee.UserName;
            result.EmployeeEmail = employee.Email;
            Console.WriteLine("employe econtroler" + result.UserName);

            Console.WriteLine(result.EmployeeEmail);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }

}
