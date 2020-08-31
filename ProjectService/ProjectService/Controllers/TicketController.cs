using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.Flight;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TicketController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Ticket/GetTickets/5
        [HttpGet("{airlineId}")]
        [Route("GetTickets/{airlineId}")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetTickets(int airlineId)
        {
            var airline = await _context.Airlines
                .Include(x => x.Flights)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (airline == null)
            {
                return NotFound();
            }

            return airline.Flights.FindAll(x => x.QuickReservationTicketCount > 0);
        }

        // GET: api/Ticket/SearchTickets/5
        [HttpPost("{airlineId}")]
        [Route("SearchTickets/{airlineId}")]
        public async Task<ActionResult<IEnumerable<Flight>>> SearchTickets(int airlineId, SearchFlightModel flight)
        {
            // po default-u
            // 1 januar 2001 00 00 00
            var airline = await _context.Airlines
                .Include(x => x.Flights)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (airline == null)
                return NotFound();

            airline.Flights = airline.Flights.FindAll(x => x.QuickReservationTicketCount > 0);

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
    }
}