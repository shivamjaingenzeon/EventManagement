using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementTool.Data
{
    public class Employee : IdentityUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public long EmployeeContact { get; set; }
        public string EmployeeDesignation { get; set; }

        [ForeignKey("RoleId")]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }

        public string EmployeeImage { get; set; }

        [NotMapped]
        public FormFile ImageFile { get; set; }

        public ICollection<Event> Events { get; set; }
        public ICollection<Participation> Participations { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}
