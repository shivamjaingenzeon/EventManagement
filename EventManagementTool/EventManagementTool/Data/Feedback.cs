using System.ComponentModel.DataAnnotations.Schema;

namespace EventManagementTool.Data
{
    public class Feedback
    {
        public int Rating { get; set; }
        public string Description { get; set; }
        [ForeignKey("EmployeeId")]
        public string EmployeeId { get; set; }
        [ForeignKey("EventId")]
        public int EventId { get; set; }

        public Event Event { get; set; }

        public Employee Employee { get; set; }
    }
}
