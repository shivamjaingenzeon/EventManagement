using Microsoft.AspNetCore.Mvc;

namespace EventManagementTool.Repository
{
    public interface IEventService
    {
        public Task DeletePastEvents();

    }
}
