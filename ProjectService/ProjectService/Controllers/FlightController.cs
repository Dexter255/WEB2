using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        // GET: api/Vehicle/5
        [HttpGet("{flightId}")]
        public async Task<ActionResult<Flight>> GetFlight(int flightId)
        {
            var flight = await _context.Flights
                .FirstOrDefaultAsync(x => x.Id == flightId);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }
    }
}