using System.ComponentModel.DataAnnotations.Schema;

namespace EventManagementTool.Data
{
    public class Participation
    {
        [ForeignKey("EmployeeId")]
        public string EmployeeId { get; set; }
        public Employee Employee { get; set; }
        [ForeignKey("EventId")]
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
