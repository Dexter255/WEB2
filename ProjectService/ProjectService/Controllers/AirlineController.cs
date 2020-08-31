using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.Flight;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AirlineController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Airline
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airline>>> GetAirlines()
        {
            return await _context.Airlines.ToListAsync();
        }

        // GET: api/Airline/5
        [HttpGet("{airlineId}")]
        [Route("GetAirline/{airlineId}")]
        public async Task<ActionResult<Airline>> GetAirline(int airlineId)
        {
            var airline = await _context.Airlines
                .Include(x => x.Destinations)
                .Include(x => x.LuggageInfo)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (airline == null)
            {
                return NotFound();
            }

            return airline;
        }

        // POST: api/Airline
        [HttpPost]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<Airline>> PostAirline(Airline airline)
        {
            _context.Airlines.Add(airline);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostAirline", new { id = airline.Id }, airline);
        }

        //// DELETE: api/Airline/5
        //[HttpDelete("{id}")]
        //[Authorize(Roles = "Admin_Airlines")]
        //public async Task<IActionResult> DeleteAirline(int id)
        //{
        //    var airline = await _context.Airlines
        //                    .Include(x => x.Destinations)
        //                    .Include(x => x.Flights)
        //                        .ThenInclude(y => y.Rows)
        //                            .ThenInclude(z => z.Seats)
        //                    .Include(x => x.LuggageInfo)
        //                    .FirstOrDefaultAsync(x => x.Id == id);

        //    if (airline == null)
        //    {
        //        return NotFound(new { message = "Airline does not exist." });
        //    }

        //    foreach (var flight in airline.Flights)
        //    {
        //        foreach (var row in flight.Rows)
        //        {
        //            if (row.Seats.Any(x => x.Type == SeatType.Taken))
        //            {
        //                return BadRequest(new { message = "Unable to delete because one or more flights are reserved." });
        //            }
        //        }
        //    }

        //    var reservedFlights = await _context.ReservedFlights.ToListAsync();

        //    foreach (var flight in airline.Flights)
        //    {
        //        foreach (var reservedFlight in reservedFlights)
        //        {
        //            if (reservedFlight.FlightId == flight.Id)
        //            {
        //                foreach (var passenger in reservedFlight.Passengers)
        //                {
        //                    _context.Passengers.Remove(passenger);
        //                }
        //                _context.ReservedFlights.Remove(reservedFlight);
        //            }
        //        }

        //        _context.Flights.Remove(flight);
        //    }

        //    foreach (var destination in airline.Destinations)
        //        _context.Destinations.Remove(destination);

        //    foreach (var luggage in airline.LuggageInfo)
        //        _context.Luggages.Remove(luggage);

        //    _context.Airlines.Remove(airline);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}

        // PUT: api/Airline/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<IActionResult> PutAirline(int id, Airline airline)
        {
            if (id != airline.Id)
            {
                return BadRequest();
            }

            var airlineDb = await _context.Airlines
                .Include(x => x.Destinations)
                .Include(x => x.LuggageInfo)
                .Include(x => x.Flights)
                .FirstOrDefaultAsync(x => x.Id == id);

            _context.Entry(airlineDb).CurrentValues.SetValues(airline);

            // Destinations
            var destinations = airlineDb.Destinations.ToList();
            foreach (var destination in destinations)
            {
                var b = airline.Destinations.SingleOrDefault(x => x.Id == destination.Id);
                if (b != null)
                    _context.Entry(destination).CurrentValues.SetValues(b);
                else
                    _context.Destinations.Remove(destination);
            }
            // add the new items
            foreach (var destination in airline.Destinations)
            {
                if (destinations.All(i => i.Id != destination.Id))
                {
                    airlineDb.Destinations.Add(destination);
                }
            }

            // Luggages
            var luggages = airlineDb.LuggageInfo.ToList();
            foreach (var luggage in luggages)
            {
                var b = airline.LuggageInfo.SingleOrDefault(x => x.Id == luggage.Id);
                if (b != null)
                    _context.Entry(luggage).CurrentValues.SetValues(b);
                else
                    _context.Luggages.Remove(luggage);
            }
            // add the new items
            foreach (var luggage in airline.LuggageInfo)
            {
                if (luggages.All(i => i.Id != luggage.Id))
                {
                    airlineDb.LuggageInfo.Add(luggage);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirlineExists(id))
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

        // GET: api/Admin/GetDestinations/2
        [HttpGet("{airlineId}")]
        [Route("GetDestinations/{airlineId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinations(int airlineId)
        {
            var airline = await _context.Airlines
                .Include(x => x.Destinations)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (airline == null)
                return NotFound();

            return airline.Destinations;
        }

        // POST: api/Airline/SearchFlights
        [HttpPost]
        [Route("SearchAirlines")]
        public async Task<ActionResult<IEnumerable<Airline>>> SearchAirlines(SearchAirlineModel airline)
        {
            // po default-u
            // 1 januar 2001 00 00 00
            var airlines = await _context.Airlines
                .Include(x => x.Flights)
                .Include(x => x.Destinations)
                .ToListAsync();

            if (!String.IsNullOrEmpty(airline.CompanyName))
                airlines = airlines.FindAll(x => x.CompanyName.ToLower().Contains(airline.CompanyName.ToLower()));

            if (!String.IsNullOrEmpty(airline.Address))
                airlines = airlines.FindAll(x => x.Address.ToLower().Contains(airline.Address.ToLower()));

            if (!String.IsNullOrEmpty(airline.FlightStartDestination))
                airlines = airlines.FindAll(x => x.Destinations.Any(y => y.City.ToLower().Contains(airline.FlightStartDestination.ToLower())));

            if (!String.IsNullOrEmpty(airline.FlightEndDestination))
                airlines = airlines.FindAll(x => x.Destinations.Any(y => y.City.ToLower().Contains(airline.FlightEndDestination.ToLower())));

            if (airline.FlightStartDate.Date.ToString("d") != new DateTime(2001, 1, 1).Date.ToString("d"))
                airlines = airlines.FindAll(x => x.Flights.Any(y => y.StartDateAndTime.Date.ToString("d") == airline.FlightStartDate.Date.ToString("d")));

            return airlines;
        }

        private bool AirlineExists(int id)
        {
            return _context.Airlines.Any(e => e.Id == id);
        }

    }
}