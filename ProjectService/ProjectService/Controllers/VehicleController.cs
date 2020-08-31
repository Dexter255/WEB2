using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.RentACar;
using ProjectService.Models.Users;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _usermanager;

        public VehicleController(DatabaseContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _usermanager = userManager;
        }

        // GET: api/Vehicle
        [HttpGet("{mode}/{companyid}")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles(string mode, int companyid)
        {
            var rentACarCompany = await _context.RentACarCompanies
                .Include(company => company.Vehicles)
                .FirstOrDefaultAsync(x => x.Id == companyid);

            if (rentACarCompany == null)
            {
                return NotFound();
            }

            return rentACarCompany.Vehicles.ToList();
        }

        // GET: api/Vehicle/GetVehicle/5
        [HttpGet("{id}")]
        [Route("GetVehicle/{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        // PUT: api/Vehicle/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin_RentACarCompanies")]
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

        // DELETE: api/Vehicle/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin_RentACarCompanies")]
        public async Task<ActionResult<Vehicle>> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (vehicle == null)
            {
                return NotFound(new { message = "Vehicle does not exist." });
            }

            if (vehicle.Reserved > 0)
            {
                return BadRequest(new { message = "Unable to delete because vehicle is reserved." });
            }

            var reservedVehicles = await _context.ReservedVehicles.ToListAsync();

            reservedVehicles.RemoveAll(x => x.VehicleId == id);

            foreach (var freeDate in vehicle.FreeDates)
                _context.FreeDates.Remove(freeDate);

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return vehicle;
        }

        // POST: api/Vehicle/SearchVehicles/2
        [HttpPost("{companyId}")]
        [Route("SearchVehicles/{companyId}")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> SearchVehicles(int companyId, SearchVehicleModel vehicle)
        {
            var racCompany = await _context.RentACarCompanies
                .Include(x => x.Vehicles)
                    .ThenInclude(y => y.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == companyId);

            if (racCompany == null)
                return NotFound();

            var vehicles = racCompany.Vehicles;

            if (vehicle.FromDate.Date.ToString("d") != new DateTime(2001, 1, 1).Date.ToString("d") &&
                vehicle.ToDate.Date.ToString("d") != new DateTime(2001, 1, 1).Date.ToString("d"))
            {
                vehicles = vehicles.FindAll(x => CheckDates(x.FreeDates, vehicle.FromDate, vehicle.ToDate));
            }

            if (!String.IsNullOrEmpty(vehicle.Brand))
                vehicles = vehicles.FindAll(x => x.Brand.ToLower().Contains(vehicle.Brand.ToLower()));

            if (!String.IsNullOrEmpty(vehicle.Type))
                vehicles = vehicles.FindAll(x => x.Type == (VehicleType)Int32.Parse(vehicle.Type));

            if (!String.IsNullOrEmpty(vehicle.Seat))
                vehicles = vehicles.FindAll(x => x.NumberOfSeats == Int32.Parse(vehicle.Seat));

            return vehicles;
        }

        // POST: api/Vehicle/ReserveVehicle/
        [HttpPost]
        [Route("ReserveVehicle")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> ReserveVehicle(ReservedVehicle vehicle)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var user = await _context.ApplicationUsers
                .Include(x => x.ReservedVehicles)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var vehicleDB = await _context.Vehicles
                .Include(x => x.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == vehicle.VehicleId);

            if (!CheckDates(vehicleDB.FreeDates, vehicle.PickupDate, vehicle.ReturnDate))
            {
                return BadRequest(new { message = "Vehicle is not available between selected dates." });
            }

            vehicleDB.Reserved = vehicleDB.Reserved + 1;
            // obrisati datume iz vehicleDB
            var temp = vehicle.PickupDate;
            while (temp <= vehicle.ReturnDate)
            {
                vehicleDB.FreeDates.RemoveAll(x => x.Date.Date.ToString("d") == temp.ToString("d"));

                temp = temp.AddDays(1);
            }

            vehicle.Brand = vehicleDB.Brand;
            vehicle.Model = vehicleDB.Model;

            user.ReservedVehicles.Add(vehicle);

            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/Vehicle/GetReservedVehicles/
        [HttpGet]
        [Route("GetReservedVehicles")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<ReservedVehicle>>> GetReservedVehicles()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var user = await _context.ApplicationUsers
                .Include(x => x.ReservedVehicles)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var currentDateTime = DateTime.Now;
            foreach (var reservedVehicle in user.ReservedVehicles)
            {
                if (!reservedVehicle.Returned)
                {
                    if (currentDateTime.Date > reservedVehicle.ReturnDate.Date)
                    {
                        var vehicleDB = await _context.Vehicles.FirstOrDefaultAsync(x => x.Id == reservedVehicle.VehicleId);
                        vehicleDB.Reserved--;

                        reservedVehicle.Returned = true;
                    }
                }
            }

            await _context.SaveChangesAsync();

            return user.ReservedVehicles;
        }

        // GET: api/Vehicle/RateReservedVehicle
        [HttpGet("{vehicleId}/{companyRating}/{rating}")]
        [Route("RateReservedVehicle/{vehicleId}/{companyRating}/{rating}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> RateReservedVehicle(int vehicleId, int companyRating, int rating)
        {
            var reservedVehicle = await _context.ReservedVehicles.FirstOrDefaultAsync(x => x.Id == vehicleId);
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => x.Id == reservedVehicle.VehicleId);
            var racCompany = await _context.RentACarCompanies.FirstOrDefaultAsync(x => x.Vehicles.Any(y => y.Id == vehicle.Id));

            if (reservedVehicle == null)
                return NotFound();

            reservedVehicle.Rated = true;
            reservedVehicle.Rating = rating;

            racCompany.RatedCount = racCompany.RatedCount + 1;
            racCompany.Rating += companyRating;
            racCompany.Rating = racCompany.Rating / racCompany.RatedCount;

            await _context.SaveChangesAsync();

            vehicle.RatedCount = vehicle.RatedCount + 1;
            vehicle.Rating += rating;
            vehicle.Rating = vehicle.Rating / vehicle.RatedCount;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Company and vehicle was successfully rated." });
        }

        // GET: api/Vehicle/CancelReservation/2
        [HttpGet("{vehicleId}")]
        [Route("CancelReservation/{vehicleId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CancelReservation(int vehicleId)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var user = await _context.ApplicationUsers
                .Include(x => x.ReservedVehicles)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var vehicleDB = await _context.Vehicles
                .Include(x => x.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == vehicleId);

            var reservedVehicle = user.ReservedVehicles.FirstOrDefault(x => x.VehicleId == vehicleId);

            var pickupDate = reservedVehicle.PickupDate.AddDays(-2);
            var currentDate = DateTime.Now;
            if (currentDate.Date > pickupDate.Date)
            {
                return BadRequest(new { message = "You can't cancel vehicle reservation less than 2 days before pickup date." });
            }

            vehicleDB.Reserved--;
            pickupDate = reservedVehicle.PickupDate;
            var returnDate = reservedVehicle.ReturnDate;
            // dodati datume
            while (pickupDate <= returnDate)
            {
                vehicleDB.FreeDates.Add(new FreeDate() {
                    Date = pickupDate
                });
                pickupDate = pickupDate.AddDays(1);
            }
            vehicleDB.FreeDates.OrderBy(x => x.Date);

            _context.ReservedVehicles.Remove(reservedVehicle);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Vehicle reservation was successfuly canceled." });
        }

        // GET: api/Vehicle/GetReservedVehicle/5
        [HttpGet("{vehicleId}")]
        [Route("GetReservedVehicle/{vehicleId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<ReservedVehicle>> GetReservedVehicle(int vehicleId)
        {
            var vehicle = await _context.ReservedVehicles
                .FirstOrDefaultAsync(x => x.Id == vehicleId);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        private bool CheckDates(List<FreeDate> freeDates, DateTime neededFrom, DateTime neededTo)
        {
            while (neededFrom <= neededTo)
            {
                if (!freeDates.Any(x => x.Date.ToString("d") == neededFrom.ToString("d")))
                {
                    return false;
                }

                neededFrom = neededFrom.AddDays(1);
            }

            return true;
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}
