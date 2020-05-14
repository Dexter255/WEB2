using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        // GET: api/RentACarCompany/GetRentACarCompanies
        [HttpGet]
        [Route("GetRentACarCompanies")]
        public async Task<ActionResult<IEnumerable<RentACarCompany>>> GetRentACarCompanies()
        {
            return await _context.RentACarCompanies.ToListAsync();
        }

        //// POST: api/RentACarCompany/AddRentACarCompany
        //[HttpGet]
        //[Route("AddRentACarCompany")]
        //public async Task<ActionResult<IEnumerable<RentACarCompany>>> AddRentACarCompany(RentACarCompany company)
        //{
        //    var a = 2;
        //    var b = 2;
        //    _context.RentACarCompanies.Add(new RentACarCompany());

        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetBooks", new { id = company.Id }, company);
        //}
    }
}