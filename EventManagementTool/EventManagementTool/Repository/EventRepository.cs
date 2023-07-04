using AutoMapper;
using EventManagementTool.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventManagementTool.Repository
{
    public class EventRepository : IEventService
    {
        private readonly EventManagementToolDbContext _context;
        private readonly IMapper _mapper;
        public EventRepository(EventManagementToolDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task DeletePastEvents()
        {
            DateTime today = DateTime.Today;
            IEnumerable<Event> eventsToDelete = await _context.Events
                .Where(e => e.EventStartDate.Date < today)
                .ToListAsync();

            _context.Events.RemoveRange(eventsToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
