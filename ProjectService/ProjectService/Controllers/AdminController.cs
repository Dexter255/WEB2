using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        // GET: api/Admin
        [HttpGet("{adminOf}")]
        [Route("GetAdmins/{adminOf}")]
        public async Task<ActionResult<IEnumerable<User>>> GetAdmins(string adminOf)
        {
            if (adminOf.Equals("racCompany"))
            {
                return await _userManager.Users.Select(x =>
                    new User()
                    {
                        Fullname = x.Fullname,
                        Username = x.UserName,
                        Email = x.Email,
                        Address = x.Address,
                        Number = x.PhoneNumber
                    })
                    .ToListAsync();
            }
            else    // airline
            {
                return await _userManager.Users.Select(x =>
                    new User()
                    {
                        Fullname = x.Fullname,
                        Username = x.UserName,
                        Email = x.Email,
                        Address = x.Address,
                        Number = x.PhoneNumber
                    })
                    .ToListAsync();
            }
        }

        // GET: api/Admin/5
        [HttpGet("{username}")]
        [Route("GetAdmin/{username}")]
        public async Task<ActionResult<User>> GetAdmin(string username)
        {
            var admin = await _userManager.FindByNameAsync(username);

            if (admin == null)
            {
                return NotFound();
            }

            var adminValue = new User()
            {
                Fullname = admin.Fullname,
                Username = admin.UserName,
                Email = admin.Email,
                Address = admin.Address,
                Number = admin.PhoneNumber
            };

            return adminValue;
        }

        // PUT: api/Admin/5
        [HttpPut("{username}")]
        [Route("UpdateAdmin/{username}")]
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

        //// DELETE: api/Admin/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<User>> DeleteAdmin(int id)
        //{
        //    var admin = await _context.Admins.FindAsync(id);
        //    if (admin == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Admins.Remove(admin);
        //    await _context.SaveChangesAsync();

        //    return admin;
        //}

        private bool AdminExists(string username)
        {
            return _userManager.Users.Any(e => e.UserName == username);
        }
    }
}
