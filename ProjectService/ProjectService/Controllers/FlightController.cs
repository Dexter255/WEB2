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
                .Include(x => x.Rows)
                    .ThenInclude(y => y.Seats)
                .FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // POST: api/Flight
        [HttpPost("{airlineId}")]
        [Route("AddFlight/{airlineId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<Airline>> PostFlight(int airlineId, Flight flight)
        {
            var airline = _context.Airlines
                .Include(x => x.Flights)
                .FirstOrDefault(x => x.Id == airlineId);

            for(int row = 0; row < flight.ySeats; row++)
            {
                Row rowObj = new Row();
                for(int seat = 0; seat < flight.xSeats; seat++)
                {
                    rowObj.Seats.Add(new Seat());
                }
                flight.Rows.Add(rowObj);
            }

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

        [HttpPost("{airlineId}")]
        [Route("SearchFlights/{airlineId}")]
        public async Task<ActionResult<IEnumerable<Flight>>> SearchFlights(int airlineId, SearchFlightModel flight)
        {
            // po default-u
            // 1 januar 2001 00 00 00
            var airline = await _context.Airlines
                .Include(x => x.Flights)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (!String.IsNullOrEmpty(flight.StartDestination))
                airline.Flights = airline.Flights.FindAll(x => x.StartDestination.ToLower().Contains(flight.StartDestination.ToLower()));

            if (!String.IsNullOrEmpty(flight.EndDestination))
                airline.Flights = airline.Flights.FindAll(x => x.EndDestination.ToLower().Contains(flight.EndDestination.ToLower()));

            if (flight.StartDate.Date.ToString("d") != new DateTime(2001, 1, 1).Date.ToString("d"))
                airline.Flights = airline.Flights.FindAll(x => x.StartDateAndTime.Date.ToString("d") == flight.StartDate.Date.ToString("d"));

            if (!String.IsNullOrEmpty(flight.TicketPrice))
            {
                int lowerPrice = Int32.Parse(flight.TicketPrice.Split('-')[0]);
                int higherPrice = Int32.Parse(flight.TicketPrice.Split('-')[1]);

                airline.Flights = airline.Flights.FindAll(x => lowerPrice <= x.TicketPrice && x.TicketPrice <= higherPrice);
            }

            return airline.Flights;
        }

        // POST: api/Flight/ReserveSeat/2
        [HttpPost("{flightId}")]
        [Route("ReserveSeat/{flightId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Airline>> ReserveSeat(int flightId, SeatModel seat)
        {
            var a = 2;
            //var airline = _context.Airlines
            //    .Include(x => x.Flights)
            //    .FirstOrDefault(x => x.Id == airlineId);

            //for (int row = 0; row < flight.ySeats; row++)
            //{
            //    Row rowObj = new Row();
            //    for (int seat = 0; seat < flight.xSeats; seat++)
            //    {
            //        rowObj.Seats.Add(new Seat());
            //    }
            //    flight.Rows.Add(rowObj);
            //}

            //airline.Flights.Add(flight);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("PostFlight", new { id = flight.Id }, flight);
            return null;
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.Id == id);
        }
    }
}