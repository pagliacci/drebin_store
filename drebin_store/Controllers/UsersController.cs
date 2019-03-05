using AutoMapper;
using drebin_store.Helpers;
using drebin_store.Services;
using drebin_store.Services.Models;
using drebin_store.WebModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace drebin_store.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        //private readonly AppSettings _appSettings;

        public UsersController(IUserService userService, IMapper mapper) //, AppSettings appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            //_appSettings = appSettings;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var result = _mapper.Map<UserDto>(user);
            result.Token = tokenString;

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);

            try
            {
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch(Exception ex) // TODO: replace with app exception
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("getUsers")]
        public IActionResult GetUsers()
        {
            // TODO: cover with admin permissions
            var users = _userService.GetAll();

            var result = _mapper.Map<List<UserDto>>(users);

            return Ok(result);
        }

        [HttpGet("getUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userService.GetById(this.GetCurrentUserId());

            var result = _mapper.Map<UserDto>(user);

            return Ok(result);
        }
    }
}