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

        // GET: api/Ticket
        [HttpGet("{airlineId}")]
        [Route("GetTickets/{airlineId}")]
        public async Task<ActionResult<IEnumerable<QuickReservationTicket>>> GetTickets(int airlineId)
        {
            var airline = await _context.Airlines
                .Include(x => x.QuickReservationTickets)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (airline == null)
            {
                return NotFound();
            }

            return airline.QuickReservationTickets.ToList();
        }

        // GET: api/Ticket/5
        [HttpGet("{ticketId}")]
        [Route("GetTicket/{ticketId}")]
        public async Task<ActionResult<QuickReservationTicket>> GetTicket(int ticketId)
        {
            var ticket = await _context.QuickReservationTickets
                .FirstOrDefaultAsync(x => x.Id == ticketId);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // POST: api/Ticket
        [HttpPost("{airlineId}")]
        [Route("AddTicket/{airlineId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<QuickReservationTicket>> PostTicket(int airlineId, QuickReservationTicket ticket)
        {
            var airline = _context.Airlines
                .Include(x => x.QuickReservationTickets)
                .FirstOrDefault(x => x.Id == airlineId);

            airline.QuickReservationTickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTicket", new { id = ticket.Id }, ticket);
        }

        // PUT: api/Ticket/5
        [HttpPut("{ticketId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<IActionResult> PutTicket(int ticketId, QuickReservationTicket ticket)
        {
            if (ticketId != ticket.Id)
            {
                return BadRequest();
            }

            var ticketDB = await _context.QuickReservationTickets
               .FirstOrDefaultAsync(x => x.Id == ticketId);

            _context.Entry(ticketDB).CurrentValues.SetValues(ticket);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(ticketId))
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

        // DELETE: api/Ticket/5
        [HttpDelete("{ticketId}")]
        [Authorize(Roles = "Admin_Airlines")]
        public async Task<ActionResult<QuickReservationTicket>> DeleteTicket(int ticketId)
        {
            var ticket = await _context.QuickReservationTickets
                            .FirstOrDefaultAsync(x => x.Id == ticketId);

            if (ticket == null)
            {
                return NotFound();
            }

            _context.QuickReservationTickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        [HttpPost("{airlineId}")]
        [Route("SearchTickets/{airlineId}")]
        public async Task<ActionResult<IEnumerable<QuickReservationTicket>>> SearchTickets(int airlineId, SearchFlightModel ticket)
        {
            // po default-u
            // 1 januar 2001 00 00 00
            var airline = await _context.Airlines
                .Include(x => x.QuickReservationTickets)
                .FirstOrDefaultAsync(x => x.Id == airlineId);

            if (!String.IsNullOrEmpty(ticket.StartDestination))
                airline.QuickReservationTickets = airline.QuickReservationTickets.FindAll(x => x.StartDestination.ToLower().Contains(ticket.StartDestination.ToLower()));

            if (!String.IsNullOrEmpty(ticket.EndDestination))
                airline.QuickReservationTickets = airline.QuickReservationTickets.FindAll(x => x.EndDestination.ToLower().Contains(ticket.EndDestination.ToLower()));

            if (ticket.StartDate.Date.ToString("d") != new DateTime(2001, 1, 1).Date.ToString("d"))
                airline.QuickReservationTickets = airline.QuickReservationTickets.FindAll(x => x.StartDateAndTime.Date.ToString("d") == ticket.StartDate.Date.ToString("d"));

            if (!String.IsNullOrEmpty(ticket.TicketPrice))
            {
                int lowerPrice = Int32.Parse(ticket.TicketPrice.Split('-')[0]);
                int higherPrice = Int32.Parse(ticket.TicketPrice.Split('-')[1]);

                airline.QuickReservationTickets = airline.QuickReservationTickets.FindAll(x => lowerPrice <= x.TicketPrice && x.TicketPrice <= higherPrice);
            }

            return airline.QuickReservationTickets;
        }

        private bool TicketExists(int id)
        {
            return _context.QuickReservationTickets.Any(e => e.Id == id);
        }
    }
}