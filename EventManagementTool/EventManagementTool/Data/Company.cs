using System.ComponentModel.DataAnnotations;

namespace EventManagementTool.Data
{
    public class Company
    {
        [Key]
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyEmail { get; set; }
        public long CompanyContact1 { get; set; }
        public long CompanyContact2 { get; set; }
        public string CompanyLocation { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}
