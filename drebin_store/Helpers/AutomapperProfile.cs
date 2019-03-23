using AutoMapper;
using drebin_store.Services.Models;
using drebin_store.WebModels;

namespace drebin_store.Helpers
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Product, ProductDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<MainQuestStageEnum, MainQuestStageEnumDto>().ReverseMap();
            CreateMap<OrderStateEnum, OrderStateEnumDto>().ReverseMap();
        }
    }
}
