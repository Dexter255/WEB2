using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        private readonly DatabaseContext _context;

        public AdminController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Admin
        [HttpGet("{mode}/{adminsOf}")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAdmins(string mode, string adminsOf)
        {
            if (adminsOf.Equals("racCompany"))
            {
                return await _context.ApplicationUsers
                    .ToListAsync();
            }
            else if (adminsOf.Equals("airline"))
            {
                return await _context.ApplicationUsers
                    .ToListAsync();
            }

            return null;
        }

        //// GET: api/Admin/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetAdmin(int id)
        //{
        //    var admin = await _context.Admins.FindAsync(id);

        //    if (admin == null)
        //    {
        //        return NotFound();
        //    }

        //    return admin;
        //}

        //// PUT: api/Admin/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutAdmin(int id, User admin)
        //{
        //    if (id != admin.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(admin).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AdminExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Admin
        //[HttpPost]
        //public async Task<ActionResult<User>> PostAdmin(User admin)
        //{
        //    _context.Admins.Add(admin);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetAdmin", new { id = admin.Id }, admin);
        //}

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

        //private bool AdminExists(int id)
        //{
        //    return _context.Admins.Any(e => e.Id == id);
        //}
    }
}
