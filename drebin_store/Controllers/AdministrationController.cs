using AutoMapper;
using drebin_store.Services;
using drebin_store.Services.Models;
using drebin_store.WebModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    // TODO: cover with admin permissions
    // TODO: split across multiple controllers or keep it here?
    public class AdministrationController : ControllerBase
    {
        private readonly IStoreService _storeService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AdministrationController(IStoreService storeService, IUserService userService, IMapper mapper)
        {
            _storeService = storeService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            return _mapper.Map<IEnumerable<UserDto>>(await _userService.GetAll());
        }

        [HttpGet("[action]")]
        public async Task<UserDto> GetUser(int userId)
        {
            return _mapper.Map<UserDto>(await _userService.GetById(userId));
        }

        // method to add drebin points and update stage of quest
        [HttpPost("[action]")]
        public UserDto UpdateUser(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var updatedUser = _userService.Update(user);
            return _mapper.Map<UserDto>(updatedUser);
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<OrderDto>> GetOrders(int? userId = null, OrderStateEnumDto? orderState = null)
        {
            OrderStateEnum? orderStateValue = orderState != null ? _mapper.Map<OrderStateEnum>(orderState) : (OrderStateEnum?)null;
            var orders = await _storeService.GetOrders(userId, orderStateValue);
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        [HttpPost("[action]")]
        public async Task<OrderDto> CompleteOrder(OrderDto orderDto)
        {
            var order = await _storeService.CompleteOrder(orderDto.Id, _mapper.Map<OrderStateEnum>(orderDto.OrderState));
            return _mapper.Map<OrderDto>(order);
        }

        [HttpPost("[action]")]
        public async Task<ProductDto> UpdateProduct(ProductDto productDto)
        {
            var product = await _storeService.UpdateProduct(_mapper.Map<Product>(productDto));
            return _mapper.Map<ProductDto>(product);
        }
    }
}
