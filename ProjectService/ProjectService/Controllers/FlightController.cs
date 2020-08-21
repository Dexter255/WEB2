using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.Flight;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public FlightController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Vehicle
        [HttpGet("{airlineId}")]
        [Route("GetFlights/{airlineId}")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights(int airlineId)
        {
            var airline = await _context.Airlines
                .Include(x => x.Flights)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (airline == null)
            {
                return NotFound();
            }

            return airline.Flights.ToList();
        }

        // GET: api/Flight/5
        [HttpGet("{flightId}")]
        [Route("GetFlight/{flightId}")]
        public async Task<ActionResult<Flight>> GetFlight(int flightId)
        {
            var flight = await _context.Flights
                .Include(x => x.Locations)
                .FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // POST: api/Flight
        [HttpPost("{airlineId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<Airline>> PostFlight(int airlineId, Flight flight)
        {
            var airline = _context.Airlines
                .Include(x => x.Flights)
                .FirstOrDefault(x => x.Id == airlineId);

            airline.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostFlight", new { id = flight.Id }, flight);
        }

        // PUT: api/Flight/5
        [HttpPut("{flightId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<IActionResult> PutFlight(int flightId, Flight flight)
        {
            flight.StartDateAndTime = flight.StartDateAndTime.AddHours(2);
            flight.EndDateAndTime = flight.EndDateAndTime.AddHours(2);

            if (flightId != flight.Id)
            {
                return BadRequest();
            }

            var flightDB = await _context.Flights
               .Include(v => v.Locations)
               .FirstOrDefaultAsync(x => x.Id == flightId);

            // update properties on the parent
            _context.Entry(flightDB).CurrentValues.SetValues(flight);

            // remove or update child collection items
            var locations = flightDB.Locations.ToList();
            foreach (var location in locations)
            {
                var fd = flight.Locations.SingleOrDefault(x => x.Id == location.Id);
                if (fd != null)
                    _context.Entry(location).CurrentValues.SetValues(fd);
                else
                    _context.Destinations.Remove(location);
            }
            // add the new items
            foreach (var location in flight.Locations)
            {
                if (locations.All(i => i.Id != location.Id))
                {
                    flightDB.Locations.Add(location);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(flightId))
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

        // DELETE: api/Flight/5
        [HttpDelete("{flightId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<Flight>> DeleteFlight(int flightId)
        {
            var flight = await _context.Flights
                            .Include(x => x.Locations)
                            .FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight == null)
            {
                return NotFound();
            }

            foreach (var location in flight.Locations)
                _context.Destinations.Remove(location);

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return flight;
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.Id == id);
        }
    }
}