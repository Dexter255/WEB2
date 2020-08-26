using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.Flight;
using ProjectService.Models.Users;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FlightController(DatabaseContext context,
            UserManager<ApplicationUser> userManager)
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

            for (int row = 0; row < flight.ySeats; row++)
            {
                Row rowObj = new Row();
                for (int seat = 0; seat < flight.xSeats; seat++)
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

        // POST: api/Flight/ReserveFlight/2
        [HttpPost("{flightId}")]
        [Route("ReserveFlight/{flightId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> ReserveFlight(int flightId, List<SeatModel> seats)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.ReservedFlights)
                    .ThenInclude(y => y.Passengers)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var flight = await _context.Flights
                .Include(x => x.Rows)
                    .ThenInclude(y => y.Seats)
                .FirstOrDefaultAsync(x => x.Id == flightId);

            List<Passenger> passengers = new List<Passenger>();
            foreach (var seat in seats)
            {
                var seatTemp = flight.Rows
                    .FirstOrDefault(x => x.Id == seat.RowId)
                    .Seats
                    .FirstOrDefault(x => x.Id == seat.SeatId);

                // dodaje se osoba koja je napravila rezervaciju
                if(!String.IsNullOrEmpty(seat.User_Username) && seat.User_Username.Equals("for me"))
                {
                    seatTemp.User_Fullname = loggedUser.Fullname;
                    seatTemp.User_PassportNumber = loggedUser.PassportNumber;
                    seatTemp.User_Username = loggedUser.UserName;

                    passengers.Add(new Passenger()
                    {
                        User_Fullname = loggedUser.Fullname,
                        User_PassportNumber = loggedUser.PassportNumber,
                        User_Username = loggedUser.UserName
                    });
                }
                // dodaje se osoba koja nije korisnik aplikacije
                else if (String.IsNullOrEmpty(seat.User_Username))
                {
                    seatTemp.User_Fullname = seat.User_Fullname;
                    seatTemp.User_PassportNumber = seat.User_PassportNumber;

                    passengers.Add(new Passenger()
                    {
                        User_Fullname = seat.User_Fullname,
                        User_PassportNumber = seat.User_PassportNumber
                    });
                }
                // poziva se postojeci user
                else
                {
                    var user = await _context.ApplicationUsers
                        .Include(x => x.FlightInvitations)
                        .FirstOrDefaultAsync(x => x.UserName == seat.User_Username);

                    user.FlightInvitations.Add(flight);

                    seatTemp.User_Fullname = user.Fullname;
                    seatTemp.User_PassportNumber = user.PassportNumber;
                    seatTemp.User_Username = user.UserName;

                    passengers.Add(new Passenger()
                    {
                        User_Fullname = seat.User_Fullname,
                        User_PassportNumber = seat.User_PassportNumber,
                        User_Username = seat.User_Username
                    });
                }
            }

            loggedUser.ReservedFlights.Add(new ReservedFlight()
            {
                FlightId = flight.Id,
                Passengers = passengers
            });

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.Id == id);
        }
    }
}