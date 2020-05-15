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
    public class VehicleController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public VehicleController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Vehicle/2
        [HttpGet("{companyId}")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles(int companyId)
        {
            var rentACarCompany = await _context.RentACarCompanies
                .Include(company => company.Vehicles)
                    .ThenInclude(vehicle => vehicle.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == companyId);

            if (rentACarCompany == null)
            {
                return NotFound();
            }

            return rentACarCompany.Vehicles.ToList();
        }

        //// GET: api/Vehicle/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        //{
        //    var vehicle = await _context.Vehicles.FindAsync(id);

        //    if (vehicle == null)
        //    {
        //        return NotFound();
        //    }

        //    return vehicle;
        //}

        // PUT: api/Vehicle/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // POST: api/Vehicle
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehicle", new { id = vehicle.Id }, vehicle);
        }

        // DELETE: api/Vehicle/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vehicle>> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return vehicle;
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}
