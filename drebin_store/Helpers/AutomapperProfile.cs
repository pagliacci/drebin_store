using AutoMapper;
using drebin_store.Services.Models;
using drebin_store.WebModels;

namespace drebin_store.Helpers
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            //CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserDto>()
                .ForMember(x => x.HasNotificationSubscription, x => x.MapFrom(y => !string.IsNullOrEmpty(y.NotificationSubscriptionString)))
                .ReverseMap(); ;
            CreateMap<Product, ProductDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderStateEnum, OrderStateEnumDto>().ReverseMap();
        }
    }
}
