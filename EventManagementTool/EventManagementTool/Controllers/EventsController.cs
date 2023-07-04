using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventManagementTool.Data;
using EventManagementTool.Repository;

namespace EventManagementTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventManagementToolDbContext _context;
        private readonly IEventService _eventService;

        public EventsController(EventManagementToolDbContext context, IEventService eventService)
        {
            _context = context;
            _eventService = eventService;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            DateTime today = DateTime.Today;
            IEnumerable<Event> events = await _context.Events.ToListAsync();
            events = events.Where(e => e.EventAuthorizationStatus == true && e.EventStartDate.Date >= today)
                   .OrderBy(e => e.EventStartDate);
            return Ok(events);
        }

        [HttpGet("unauthorizedEvents")]
        public async Task<ActionResult<IEnumerable<Event>>> GetUnauthorizatedEvents()
        {
            IEnumerable<Event> events = await _context.Events.ToListAsync();
            events = events.Where(e => e.EventAuthorizationStatus == false);
            return Ok(events);
        }
        [HttpPut("setAuthorizationStatus/{eventId}")]
        public async Task<ActionResult> SetAuthorizationStatus(int eventId)
        {
            var e = await _context.Events.FindAsync(eventId);
            e.EventAuthorizationStatus = true;
            _context.Entry(e).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(e);
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpGet("searchByEmployeeId/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsByEmployeeId(string employeeId)
        {
            IEnumerable<Event> events = await _context.Events.ToListAsync();
            events = events.Where(e => e.EventAuthorizationStatus == true && e.EmployeeId == employeeId)
                .OrderBy(e => e.EventStartDate);
            return Ok(events);
        }


        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            Console.WriteLine("in event controller Put event");
            if (id != @event.EventId)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{employeeId}")]
        public async Task<ActionResult<Event>> PostEvent([FromBody] Event eventI, string EmployeeId)
        {
            Console.WriteLine("in event controller" + EmployeeId);
           /* eventI.EmployeeId = EmployeeId;*/

            _context.Events.Add(eventI);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = eventI.EventId }, eventI);
        }

        /*  [HttpPost("{employeeId}")]
          public async Task<ActionResult<Event>> PostEvent(string EmployeeId, Event @event)
          {
              Console.WriteLine("in event controller" + EmployeeId + @event);

              _context.Events.Add(@event);
              await _context.SaveChangesAsync();

              return CreatedAtAction("GetEvent", new { id = @event.EventId }, @event);
          }*/

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            Console.Write("In delete event controller");
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.EventId == id);
        }
        

    }
}
