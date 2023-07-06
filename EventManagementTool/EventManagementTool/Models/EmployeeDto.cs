using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EventManagementTool.Models
{
    public class EmployeeDto : LoginDto
    {
       
        public string EmployeeName { get; set; }
        public long EmployeeContact { get; set; }
        public string EmployeeDesignation { get; set; }
        public int RoleId { get; set; }
        public int CompanyId { get; set; }
        public string EmployeeImage { get; set; }
        public FormFile ImageFile { get; set; }


    }
}
