﻿using AutoMapper;
using drebin_store.Helpers;
using drebin_store.Services;
using drebin_store.Services.Models;
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
    // TODO: cover with admin permissions
    // TODO: split across multiple controllers or keep it here?
    public class AdministrationController : ControllerBase
    {
        private readonly IStoreService _storeService;
        private readonly IUserService _userService;
        private readonly IHubContext<SignalRHub, ITypedHubClient> _hubContext;
        private readonly IMapper _mapper;
        private readonly IWebPushService _webPushService;

        public AdministrationController(IStoreService storeService, IUserService userService, IWebPushService webPushService, IHubContext<SignalRHub, ITypedHubClient> hubContext, IMapper mapper)
        {
            _storeService = storeService;
            _userService = userService;
            _webPushService = webPushService;
            _hubContext = hubContext;
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
            return _mapper.Map<UserDto>(_userService.GetById(userId));
        }

        // method to add drebin points and update stage of quest
        [HttpPost("[action]")]
        public async Task<UserDto> UpdateUser(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var updatedUser = await _userService.Update(user, this.GetCurrentUserId());

            var updatedUserDto = _mapper.Map<UserDto>(updatedUser);

            await _hubContext.Clients.All.UpdateUser(updatedUserDto);

            return updatedUserDto;
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

            var responseDto = _mapper.Map<OrderDto>(order);

            await _hubContext.Clients.All.UpdateOrder(responseDto);
            await _hubContext.Clients.All.UpdateProduct(responseDto.Product);

            return responseDto;
        }

        [HttpPost("[action]")]
        public async Task<ProductDto> UpdateProduct(ProductDto productDto)
        {
            var product = await _storeService.UpdateProduct(_mapper.Map<Product>(productDto));

            var responseDto = _mapper.Map<ProductDto>(product);

            await _hubContext.Clients.All.UpdateProduct(responseDto);

            return responseDto;
        }

        [HttpPost("[action]")]
        public async Task<ProductDto> CreateProduct(ProductDto productDto)
        {
            var product = _storeService.CreateProduct(_mapper.Map<Product>(productDto));

            var responseDto = _mapper.Map<ProductDto>(product);

            await _hubContext.Clients.All.UpdateProduct(responseDto);

            return responseDto;
        }

        [HttpPost("[action]")]
        public async Task DeleteProduct([FromBody]int productId)
        {
            await _storeService.DeleteProduct(productId);
        }

        [HttpPost("[action]")]
        public async Task SendNotification([FromBody]int userId)
        {
            var user = _userService.GetById(userId);
            var notification = new Notification
            {
                Title = "MGS зовёт!",
                Body = "Нет времени объяснять, вот тебе картинка goatse из интернетов!",
                Dir = "auto",
                Icon = "https://memepedia.ru/wp-content/uploads/2018/10/goatse-donuts.png",
                Badge = "https://panfilov.dev/assets/fox_transparent_background.png",
                Renotify = true,
                Lang = "en",
                RequireInteraction = false,
                Vibrate = new[] { 200, 100, 200 }
            };
            _webPushService.SendNotification(user, notification); // TODO: add check whether notification was sent or not?
        }
    }
}
