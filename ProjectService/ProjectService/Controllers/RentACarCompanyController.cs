using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "Admin_RentACarCompanies")]
        public async Task<IActionResult> PutRentACarCompany(int id, RentACarCompany rentACarCompany)
        {
            if (id != rentACarCompany.Id)
            {
                return BadRequest();
            }

            var racCompany = await _context.RentACarCompanies
                .Include(company => company.Branches)
                .Include(company => company.Services)
                .Include(company => company.Vehicles)
                    .ThenInclude(vehicle => vehicle.FreeDates)
                .FirstOrDefaultAsync(x => x.Id == id);

            // update properties on the parent
            _context.Entry(racCompany).CurrentValues.SetValues(rentACarCompany);

            #region Branches
            // remove or update child collection items
            var branches = racCompany.Branches.ToList();
            foreach (var branch in branches)
            {
                var b = rentACarCompany.Branches.SingleOrDefault(x => x.Id == branch.Id);
                if (b != null)
                    _context.Entry(branch).CurrentValues.SetValues(b);
                else
                    _context.Branches.Remove(branch);
            }
            // add the new items
            foreach (var branch in rentACarCompany.Branches)
            {
                if (branches.All(i => i.Id != branch.Id))
                {
                    racCompany.Branches.Add(branch);
                }
            }
            #endregion

            #region Services
            // remove or update child collection items
            var services = racCompany.Services.ToList();
            foreach (var service in services)
            {
                var s = rentACarCompany.Services.SingleOrDefault(x => x.Id == service.Id);
                if (s != null)
                    _context.Entry(service).CurrentValues.SetValues(s);
                else
                    _context.Remove(service);
            }
            // add the new items
            foreach (var service in rentACarCompany.Services)
            {
                if (services.All(i => i.Id != service.Id))
                {
                    racCompany.Services.Add(service);
                }
            }
            #endregion

            // Kada se vrsi azuriranje RentACarCompany-je, Vehicle se samo dodaje
            #region Vehicles
            // remove or update child collection items
            //foreach (var vehicle in vehicles)
            //{
            //    var v = rentACarCompany.Vehicles.SingleOrDefault(x => x.Id == vehicle.Id);
            //    if (v != null)
            //        _context.Entry(vehicle).CurrentValues.SetValues(v);
            //    else
            //        _context.Remove(vehicle);
            //}
            var vehicles = racCompany.Vehicles.ToList();
            // add the new items
            foreach (var vehicle in rentACarCompany.Vehicles)
            {
                if (vehicles.All(i => i.Id != vehicle.Id))
                {
                    racCompany.Vehicles.Add(vehicle);
                }
            }
            #endregion

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
        [Authorize(Roles = "Admin_RentACarCompanies")]
        public async Task<ActionResult<RentACarCompany>> PostRentACarCompany(RentACarCompany rentACarCompany)
        {
            _context.RentACarCompanies.Add(rentACarCompany);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentACarCompany", new { id = rentACarCompany.Id }, rentACarCompany);
        }

        // DELETE: api/RentACarCompany/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin_RentACarCompanies")]
        public async Task<ActionResult<RentACarCompany>> DeleteRentACarCompany(int id)
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

            foreach (var service in rentACarCompany.Services)
                _context.Services.Remove(service);

            foreach (var branch in rentACarCompany.Branches)
                _context.Branches.Remove(branch);

            foreach (var vehicle in rentACarCompany.Vehicles)
            {
                foreach (var freeDate in vehicle.FreeDates)
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
