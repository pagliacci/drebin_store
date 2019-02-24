using AutoMapper;
using drebin_store.Services;
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
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;
        private readonly IMapper _mapper;

        public StoreController(IStoreService storeService, IMapper mapper)
        {
            _storeService = storeService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ProductDto>> Products()
        {
            var products = await _storeService.GetProducts();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
    }
}
