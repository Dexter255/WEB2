﻿using System;
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

            flight.StartDateAndTime = flight.StartDateAndTime.AddHours(2);
            flight.EndDateAndTime = flight.EndDateAndTime.AddHours(2);
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

        // POST: api/Flight/AddQuickReservationTickets/2
        [HttpPost("{flightId}")]
        [Route("AddSeatsForQuickReservationTickets/{flightId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<IActionResult> AddSeatsForQuickReservationTickets(int flightId, List<SeatModel> seats)
        {
            var flight = await _context.Flights
                .Include(x => x.Rows)
                    .ThenInclude(y => y.Seats)
                .FirstOrDefaultAsync(x => x.Id == flightId);

            foreach(var seat in seats)
            {
                flight.Rows.FirstOrDefault(x => x.Id == seat.RowId)
                    .Seats.FirstOrDefault(x => x.Id == seat.SeatId).Type = SeatType.QuickReservation;
            }

            await _context.SaveChangesAsync();

            return Ok();
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
                            .Include(x => x.Rows)
                                .ThenInclude(y => y.Seats)
                            .FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight == null)
            {
                return NotFound();
            }

            foreach (var location in flight.Locations)
                _context.Destinations.Remove(location);

            foreach (var row in flight.Rows)
            {
                foreach (var seat in row.Seats)
                {
                    _context.Seats.Remove(seat);
                }
                _context.Rows.Remove(row);
            }

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
                if (!String.IsNullOrEmpty(seat.User_Username) && seat.User_Username.Equals("for me"))
                {
                    seatTemp.User_Fullname = loggedUser.Fullname;
                    seatTemp.User_PassportNumber = loggedUser.PassportNumber;
                    seatTemp.User_Username = loggedUser.UserName;
                    seatTemp.Type = SeatType.Taken;

                    // dodaje se kao putnik samo zbog RowId, SeatId
                    // kako bi u slucaju otkazivanja moglo da se 
                    // oslobodi sediste koje je rezervisao
                    passengers.Add(new Passenger()
                    {
                        User_Fullname = loggedUser.Fullname,
                        User_PassportNumber = loggedUser.PassportNumber,
                        User_Username = loggedUser.UserName,
                        RowId = seat.RowId,
                        SeatId = seat.SeatId
                    });
                }
                // dodaje se osoba koja nije korisnik aplikacije
                else if (String.IsNullOrEmpty(seat.User_Username))
                {
                    seatTemp.User_Fullname = seat.User_Fullname;
                    seatTemp.User_PassportNumber = seat.User_PassportNumber;
                    seatTemp.Type = SeatType.Taken;

                    passengers.Add(new Passenger()
                    {
                        User_Fullname = seat.User_Fullname,
                        User_PassportNumber = seat.User_PassportNumber,
                        RowId = seat.RowId,
                        SeatId = seat.SeatId
                    });
                }
                // poziva se postojeci user
                else
                {
                    var user = await _context.ApplicationUsers
                        .Include(x => x.FlightInvitations)
                        .FirstOrDefaultAsync(x => x.UserName == seat.User_Username);

                    user.FlightInvitations.Add(new FlightInvitation()
                    {
                        Option = Option.Pending,
                        FlightId = flight.Id,
                        Destination = flight.StartDestination + " - " + flight.EndDestination,
                        InvitationFromUser = loggedUser.UserName
                    });

                    seatTemp.User_Fullname = user.Fullname;
                    seatTemp.User_PassportNumber = user.PassportNumber;
                    seatTemp.User_Username = user.UserName;
                    seatTemp.Type = SeatType.Taken;

                    passengers.Add(new Passenger()
                    {
                        User_Fullname = user.Fullname,
                        User_PassportNumber = user.PassportNumber,
                        User_Username = user.UserName,
                        RowId = seat.RowId,
                        SeatId = seat.SeatId
                    });
                }
            }

            loggedUser.ReservedFlights.Add(new ReservedFlight()
            {
                FlightId = flight.Id,
                Destination = flight.StartDestination + " - " + flight.EndDestination,
                Passengers = passengers
            });

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Flight/GerReservedFlights
        [HttpGet]
        [Route("GetReservedFlights")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<ReservedFlight>>> GetReservedFlights()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.ReservedFlights)
                    .ThenInclude(y => y.Passengers)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return loggedUser.ReservedFlights;
        }

        [HttpGet("{flightId}")]
        [Route("CancelReservation/{flightId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CancelReservation(int flightId)
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

            var flightStart = flight.StartDateAndTime.AddHours(-3);
            var currentDateTime = DateTime.Now;
            if (currentDateTime.Date > flightStart.Date ||
                (currentDateTime.Date == flightStart.Date &&
                currentDateTime.TimeOfDay > flightStart.TimeOfDay))
            {
                return BadRequest(new { message = "You can't cancel reservation less than 3 hours before flight." });
            }

            var reservedFlight = loggedUser.ReservedFlights
                .FirstOrDefault(x => x.FlightId == flight.Id);

            foreach (var passenger in reservedFlight.Passengers)
            {
                // prijatelj
                if (!String.IsNullOrEmpty(passenger.User_Username) && !passenger.User_Username.Equals(loggedUser.UserName))
                {
                    var friend = await _context.ApplicationUsers
                        .Include(x => x.FlightInvitations)
                        .FirstOrDefaultAsync(x => x.UserName == passenger.User_Username);

                    var flightInvitation = friend.FlightInvitations.FirstOrDefault(x => x.FlightId == flight.Id && x.InvitationFromUser == loggedUser.UserName);
                    _context.FlightInvitations.Remove(flightInvitation);
                }

                var seat = flight.Rows
                    .FirstOrDefault(x => x.Id == passenger.RowId)
                    .Seats
                    .FirstOrDefault(x => x.Id == passenger.SeatId);

                seat.Type = SeatType.Free;
            }

            foreach (var passenger in reservedFlight.Passengers)
                _context.Passengers.Remove(passenger);

            _context.ReservedFlights.Remove(reservedFlight);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Reservation successfully canceled." });
        }

        // GET: api/Flight/GetFlightInvitations
        [HttpGet]
        [Route("GetFlightInvitations")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<FlightInvitation>>> GetFlightInvitations()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.FlightInvitations)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return loggedUser.FlightInvitations;
        }

        // GET: api/Flight/AcceptFlightInvitation/2
        [HttpGet("{flightId}")]
        [Route("AcceptFlightInvitation/{flightId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AcceptFlightInvitation(int flightId)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.FlightInvitations)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var flightInvitation = loggedUser.FlightInvitations.FirstOrDefault(x => x.Id == flightId);

            flightInvitation.Option = Option.Accepted;

            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/Flight/DeclineFlightInvitation/2
        [HttpGet("{flightId}")]
        [Route("DeclineFlightInvitation/{flightId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> DeclineFlightInvitation(int flightId)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.FlightInvitations)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var flightInvitation = loggedUser.FlightInvitations.FirstOrDefault(x => x.Id == flightId);

            flightInvitation.Option = Option.Declined;

            var invitationFromUser = await _context.ApplicationUsers
                .Include(x => x.ReservedFlights)
                    .ThenInclude(y => y.Passengers)
                .FirstOrDefaultAsync(x => x.UserName == flightInvitation.InvitationFromUser);

            var passenger = invitationFromUser.ReservedFlights
                .FirstOrDefault(x => x.FlightId == flightInvitation.FlightId)
                .Passengers
                .FirstOrDefault(x => x.User_Username == loggedUser.UserName);

            _context.Passengers.Remove(passenger);

            var seat = await _context.Seats.FirstOrDefaultAsync(x => x.Id == passenger.SeatId);
            seat.Type = SeatType.Free;

            await _context.SaveChangesAsync();

            return Ok();
        }


        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.Id == id);
        }
    }
}