using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventManagementTool.Data;
using EventManagementTool.Models;


namespace EventManagementTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipationsController : ControllerBase
    {
        private readonly EventManagementToolDbContext _context;

        public ParticipationsController(EventManagementToolDbContext context)
        {
            _context = context;
        }

        // GET: api/Participations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participation>>> GetParticipations()
        {
            return await _context.Participations.ToListAsync();
        }

        // GET: api/Participations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participation>> GetParticipation(string id)
        {
            var participation = await _context.Participations.FindAsync(id);

            if (participation == null)
            {
                return NotFound();
            }

            return participation;
        }

        [HttpPost]
        [Route("participations/{employeeId}/{eventId}")]
        public async Task<ActionResult> ParticipateInEvent(string employeeId, int eventId)
        {
            Console.WriteLine("in Participation controller");
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
            var @event = await _context.Events.FirstOrDefaultAsync(ev => ev.EventId == eventId);

            if (employee == null || @event == null)
            {
                return NotFound();
            }

            var participation = new Participation
            {
                EmployeeId = employeeId,
                EventId = eventId
            };

            _context.Participations.Add(participation);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("participations/{employeeId}/{eventId}/status")]
        public Task<IActionResult> CheckParticipationStatus(string employeeId, int eventId)
        {
            // Check if the employee has participated in the event
            var participation = _context.Participations.FirstOrDefault(p => p.EmployeeId == employeeId && p.EventId == eventId);

            if (participation != null)
            {
                return Task.FromResult<IActionResult>(Ok(true));
            }

            return Task.FromResult<IActionResult>(Ok(false)); 
        }

        [HttpGet("participatedEvents/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetParticipatedEventsByEmployeeId(string employeeId)
        {
            Console.WriteLine("in get participated method");
            var events = await _context.Events
                .Where(e => e.Participations.Any(p => p.EmployeeId == employeeId))
                .OrderBy(e => e.EventStartDate)
                .ToListAsync();

            return Ok(events);
        }




    }
}
