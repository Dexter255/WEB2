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

        //// POST: api/Ticket/ReserveTicket/2
        //[HttpPost("{flightId}")]
        //[Route("ReserveTicket/{flightId}")]
        //[Authorize(Roles = "User")]
        //public async Task<IActionResult> ReserveTicket(int flightId, List<Passenger> passengers)
        //{
        //    string userId = User.Claims.First(x => x.Type == "UserID").Value;
        //    var loggedUser = await _context.ApplicationUsers
        //        .Include(x => x.ReservedFlights)
        //            .ThenInclude(y => y.Passengers)
        //        .FirstOrDefaultAsync(x => x.Id == userId);


        //    return null;
        //}
    }
}