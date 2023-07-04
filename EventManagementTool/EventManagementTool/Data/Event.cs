using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EventManagementTool.Data
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public DateTime EventStartDate { get; set; }
        public DateTime EventEndDate { get; set; }
        public TimeSpan EventStartTime { get; set; }
        public TimeSpan EventEndTime { get; set; }
        public string EventVenue { get; set; }
        public bool EventAuthorizationStatus { get; set; }


        [ForeignKey(nameof(Employee))]
        public string EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public ICollection<Participation> Participations { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    }
}
