using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjectService.Models;
using ProjectService.Models.Users;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _applicationSettings;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager,
            IOptions<ApplicationSettings> applicationSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationSettings = applicationSettings.Value;
        }

        // POST : api/ApplicationUser/Register
        [HttpPost]
        [Route("Register")]
        public async Task<Object> Register(User user)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = user.Username,
                Fullname = user.Fullname,
                Email = user.Email,
                Address = user.Address,
                PhoneNumber = user.Number
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, user.Password);
                await _userManager.AddToRoleAsync(applicationUser, user.Type.ToString());
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST : api/ApplicationUser/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if(user != null &&  await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions identityOptions = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)),
                        SecurityAlgorithms.HmacSha256
                        )
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect." });
            }
        }

        // POST : api/ApplicationUser/GetUserProfile
        [HttpGet]
        [Authorize]
        [Route("GetUserProfile")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            var role = _userManager.GetRolesAsync(user);

            return new User()
            {
                Fullname = user.Fullname,
                Username = user.UserName,
                Email = user.Email,
                Address = user.Address,
                Number = user.PhoneNumber
            };
        }

        // PUT: api/ApplicationUser/UpdateUser/Matke
        [HttpPut("{username}")]
        [Route("UpdateUser/{username}")]
        public async Task<IActionResult> PutUser(string username, User user)
        {
            if (username != user.Username)
            {
                return BadRequest();
            }

            var userDB = await _userManager.FindByNameAsync(username);

            if (userDB == null)
            {
                return NotFound();
            }

            userDB.Fullname = user.Fullname;
            userDB.Email = user.Email;
            userDB.Address = user.Address;
            userDB.PhoneNumber = user.Number;

            try
            {
                await _userManager.UpdateAsync(userDB);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(username))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool UserExists(string username)
        {
            return _userManager.Users.Any(e => e.UserName == username);
        }

    }
}