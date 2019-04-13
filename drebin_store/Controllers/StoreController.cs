using AutoMapper;
using drebin_store.Helpers;
using drebin_store.Services;
using drebin_store.SignalRHubs;
using drebin_store.WebModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;
        private readonly IUserService _userService;
        private readonly IHubContext<SignalRHub, ITypedHubClient> _hubContext;
        private readonly IMapper _mapper;

        public StoreController(
            IStoreService storeService, 
            IUserService userService, 
            IHubContext<SignalRHub, ITypedHubClient> hubContext, 
            IMapper mapper)
        {
            _storeService = storeService;
            _userService = userService;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ProductDto>> Products()
        {
            var products = await _storeService.GetProducts();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        [HttpPost("[action]")]
        public OrderDto Order([FromBody]int productId)
        {
            var order = _storeService.PlaceOrder(productId, this.GetCurrentUserId());

            _hubContext.Clients.All.UpdateUser(_mapper.Map<UserDto>(order.User));
            _hubContext.Clients.All.UpdateProduct(_mapper.Map<ProductDto>(order.Product));

            return _mapper.Map<OrderDto>(order);
        }
    }
}
