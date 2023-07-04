using EventManagementTool.Models;
using Microsoft.AspNetCore.Identity;

namespace EventManagementTool.Repository
{
    public interface IAccountRepository
    {
        Task<IdentityResult> SignUpAsync(EmployeeDto employee);
        Task<ResponseDto> LoginAsync(LoginDto loginDto);
    }
}
