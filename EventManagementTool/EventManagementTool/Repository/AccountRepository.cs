using AutoMapper;
using EventManagementTool.Data;
using EventManagementTool.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EventManagementTool.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<Employee> _userManager;
        private readonly SignInManager<Employee> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AccountRepository(UserManager<Employee> userManager,
            SignInManager<Employee> signInManager,
            IConfiguration configuration, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
        }
      
        public async Task<IdentityResult> SignUpAsync(EmployeeDto employee)
        {
            var user = new Employee()
            {
              /*  EmployeeId = employee.EmployeeId,*/
                EmployeeName = employee.EmployeeName,
                EmployeeContact = employee.EmployeeContact,
                EmployeeDesignation = employee.EmployeeDesignation,
                Email = employee.EmployeeEmail,
                UserName = employee.EmployeeEmail,
                RoleId = employee.RoleId,
                CompanyId = employee.CompanyId
            };
            Console.WriteLine(user.UserName);
            Console.WriteLine(user.EmployeeName);

            return await _userManager.CreateAsync(user, employee.Password);
        }
        public async Task<ResponseDto> LoginAsync(LoginDto loginDto)
        {
            // var user = await _userManager.FindByEmailAsync(loginDto.EmployeeEmail);
            // Console.WriteLine(user.EmployeeName);
            // Console.WriteLine(user.UserName);

            // bool isvalidUser = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            var result = await _signInManager.PasswordSignInAsync(loginDto.EmployeeEmail, loginDto.Password, false, false);
            var _user = await _userManager.FindByEmailAsync(loginDto.EmployeeEmail);
            Console.WriteLine("In Login Async Method");
            Console.WriteLine(_user.ToString());
            if (_user == null || result == null)
            {
                return null;
            }
            Console.WriteLine("In Login Async Method");
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginDto.EmployeeEmail),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]));
            Console.WriteLine($"{authSigninKey}");
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:ValidIssuer"],
                audience: _configuration["JwtSettings:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                );


            var m = _mapper.Map<ResponseDto>(_user);
            m.EmployeeEmail = loginDto.EmployeeEmail;
            m.Token = new JwtSecurityTokenHandler().WriteToken(token);
            return m;
        }       
    }
}
