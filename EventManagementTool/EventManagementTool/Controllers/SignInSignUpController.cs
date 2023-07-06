using EventManagementTool.Models;
using EventManagementTool.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInSignUpController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IFileService _fileService;

        public SignInSignUpController(IAccountRepository accountRepository, IFileService fileService)
        {
            _accountRepository = accountRepository;
            _fileService = fileService;
        }


        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] EmployeeDto employee)
        {
            Console.WriteLine("In SignIn SignUP Contoller");
           /* var fileresult = _fileService.SaveImage(employee.ImageFile);
            if (fileresult.Item1 == 1) 
            { 
                employee.EmployeeImage = fileresult.Item2;
            }*/
            var result = await _accountRepository.SignUpAsync(employee);
            Console.WriteLine(result.ToString());
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return Unauthorized();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
        {
            Console.WriteLine("IN Login Controller");
            var authResponse = await _accountRepository.LoginAsync(loginDto);
            if (authResponse == null)
            {
                return Unauthorized();
            }
            return Ok(authResponse);
        }
    }
}
