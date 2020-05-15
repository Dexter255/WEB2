using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.RentACar;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentACarCompanyController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RentACarCompanyController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/RentACarCompany
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentACarCompany>>> GetRentACarCompanies()
        {
            return await _context.RentACarCompanies.ToListAsync();
        }

        // GET: api/RentACarCompany/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentACarCompany>> GetRentACarCompany(int id)
        {
            var rentACarCompany = await _context.RentACarCompanies
                .Include(company => company.Branches)
                .Include(company => company.Services)
                .Include(company => company.Vehicles)
                    .ThenInclude(vehicle => vehicle.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (rentACarCompany == null)
            {
                return NotFound();
            }

            return rentACarCompany;
        }

        // PUT: api/RentACarCompany/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentACarCompany(int id, RentACarCompany rentACarCompany)
        {
            if (id != rentACarCompany.Id)
            {
                return BadRequest();
            }

            _context.Entry(rentACarCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentACarCompanyExists(id))
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

        // POST: api/RentACarCompany
        [HttpPost]
        public async Task<ActionResult<RentACarCompany>> PostRentACarCompany(RentACarCompany rentACarCompany)
        {
            _context.RentACarCompanies.Add(rentACarCompany);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentACarCompany", new { id = rentACarCompany.Id }, rentACarCompany);
        }

        // DELETE: api/RentACarCompany/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RentACarCompany>> DeleteRentACarCompany(int id)
        {
            var rentACarCompany = await _context.RentACarCompanies
                            .Include(company => company.Branches)
                            .Include(company => company.Services)
                            .FirstOrDefaultAsync(x => x.Id == id);

            if (rentACarCompany == null)
            {
                return NotFound();
            }

            foreach(var service in rentACarCompany.Services)
                _context.Services.Remove(service);

            foreach (var branch in rentACarCompany.Branches)
                _context.Branches.Remove(branch);

            foreach(var vehicle in rentACarCompany.Vehicles)
            {
                foreach(var freeDate in vehicle.FreeDates)
                {
                    _context.FreeDates.Remove(freeDate);
                }
                _context.Vehicles.Remove(vehicle);
            }

            _context.RentACarCompanies.Remove(rentACarCompany);
            await _context.SaveChangesAsync();

            return rentACarCompany;
        }

        private bool RentACarCompanyExists(int id)
        {
            return _context.RentACarCompanies.Any(e => e.Id == id);
        }
    }
}
