using System.ComponentModel.DataAnnotations;

namespace EventManagementTool.Models
{
    public class ResponseDto
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public long EmployeeContact { get; set; }
        public string EmployeeDesignation { get; set; }
        public string EmployeeEmail { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }
        public int CompanyId { get; set; }
        public string Token { get; set; }
    }
}
