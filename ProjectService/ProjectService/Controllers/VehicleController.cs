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

        //// GET: api/Vehicle
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        //{
        //    return await _context.Vehicles.ToListAsync();
        //}

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

            var vehicleDB = await _context.Vehicles
               .Include(v => v.FreeDates)
               .FirstOrDefaultAsync(x => x.Id == id);

            // update properties on the parent
            _context.Entry(vehicleDB).CurrentValues.SetValues(vehicle);

            #region FreeDates
            // remove or update child collection items
            var freeDates = vehicleDB.FreeDates.ToList();
            foreach (var freeDate in freeDates)
            {
                var fd = vehicle.FreeDates.SingleOrDefault(x => x.Id == freeDate.Id);
                if (fd != null)
                    _context.Entry(freeDate).CurrentValues.SetValues(fd);
                else
                    _context.FreeDates.Remove(freeDate);
            }
            // add the new items
            foreach (var freeDate in vehicle.FreeDates)
            {
                if (freeDates.All(i => i.Id != freeDate.Id))
                {
                    vehicleDB.FreeDates.Add(freeDate);
                }
            }
            #endregion

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

        //// POST: api/Vehicle
        //[HttpPost]
        //public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        //{
        //    _context.Vehicles.Add(vehicle);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetVehicle", new { id = vehicle.Id }, vehicle);
        //}

        // DELETE: api/Vehicle/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vehicle>> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (vehicle == null)
            {
                return NotFound();
            }

            foreach (var freeDate in vehicle.FreeDates)
                _context.FreeDates.Remove(freeDate);

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
