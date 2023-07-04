using System.ComponentModel.DataAnnotations;

namespace EventManagementTool.Data
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
