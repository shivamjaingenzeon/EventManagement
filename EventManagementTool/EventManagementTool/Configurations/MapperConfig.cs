using AutoMapper;
using EventManagementTool.Data;
using EventManagementTool.Models;

namespace EventManagementTool.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Employee, ResponseDto>().ReverseMap();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            
        }
    }
}
