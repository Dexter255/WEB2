using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.Users;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/GetAdmins
        [HttpGet("{adminOf}")]
        [Route("GetAdmins/{adminOf}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetAdmins(string adminOf)
        {
            if (adminOf.Equals("racCompany"))
            {
                List<User> users = new List<User>();

                foreach(var user in _userManager.Users)
                {
                    var role = await _userManager.GetRolesAsync(user);
                    if(role.FirstOrDefault() == UserType.Admin_RentACarCompanies.ToString())
                    {
                        users.Add(new User() {
                            Fullname = user.Fullname,
                            Username = user.UserName,
                            Email = user.Email,
                            Address = user.Address,
                            Number = user.PhoneNumber
                        });
                    }
                }

                return users;
            }
            else    // airline
            {
                List<User> users = new List<User>();

                foreach (var user in _userManager.Users)
                {
                    var role = await _userManager.GetRolesAsync(user);
                    if (role.FirstOrDefault() == UserType.Admin_Airlines.ToString())
                    {
                        users.Add(new User()
                        {
                            Fullname = user.Fullname,
                            Username = user.UserName,
                            Email = user.Email,
                            Address = user.Address,
                            Number = user.PhoneNumber
                        });
                    }
                }

                return users;
            }
        }

        // GET: api/Admin/Dex
        [HttpGet("{username}")]
        [Route("GetAdmin/{username}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> GetAdmin(string username)
        {
            var admin = await _userManager.FindByNameAsync(username);

            if (admin == null)
            {
                return NotFound();
            }

            return new User()
            {
                Fullname = admin.Fullname,
                Username = admin.UserName,
                Email = admin.Email,
                Address = admin.Address,
                Number = admin.PhoneNumber
            };
        }

        // PUT: api/Admin/Dex
        [HttpPut("{username}")]
        [Route("UpdateAdmin/{username}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutAdmin(string username, User admin)
        {
            if (username != admin.Username)
            {
                return BadRequest();
            }

            var adminDB = await _userManager.FindByNameAsync(username);

            if (adminDB == null)
            {
                return NotFound();
            }

            adminDB.Fullname = admin.Fullname;
            adminDB.Email = admin.Email;
            adminDB.Address = admin.Address;
            adminDB.PhoneNumber = admin.Number;

            try
            {
                await _userManager.UpdateAsync(adminDB);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(username))
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

        // DELETE: api/Admin/Dex
        [HttpDelete("{username}")]
        [Route("DeleteAdmin/{username}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> DeleteAdmin(string username)
        {

            var admin = await _userManager.FindByNameAsync(username);


            if (admin == null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(admin);

            return new User()
            {
                Fullname = admin.Fullname,
                Username = admin.UserName,
                Email = admin.Email,
                Address = admin.Address,
                Number = admin.PhoneNumber
            }; ;
        }

        private bool AdminExists(string username)
        {
            return _userManager.Users.Any(e => e.UserName == username);
        }
    }
}
