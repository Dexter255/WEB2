using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectService.Models
{
    public class UpdateBackgroundService : IHostedService
    {
        private readonly DatabaseContext _context;
        private Timer _timer;

        public UpdateBackgroundService(DatabaseContext context)
        {
            _context = context;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
            {               
                cancellationToken.ThrowIfCancellationRequested();
            }
            // Invoke the DoWork method every 5 seconds. 
            _timer = new Timer(callback: async o => await DoWork(),
            state: null, dueTime: TimeSpan.FromSeconds(0),
            period: TimeSpan.FromSeconds(5));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                cancellationToken.ThrowIfCancellationRequested();
            }

            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public async Task DoWork()
        {
            var a = 2;
        }
        //protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        //{
        //    var users = await _context.ApplicationUsers
        //        .Include(x => x.FlightInvitations).ToListAsync();

        //    foreach(var user in users)
        //    {
        //        foreach(var flightInvitation in user.FlightInvitations)
        //        {
        //            var flightId = flightInvitation.FlightId;

        //            var flight = await _context.Flights
        //                .Include(x => x.Rows)
        //                    .ThenInclude(y => y.Seats)
        //                .FirstOrDefaultAsync(x => x.Id == flightId);

        //            var flightStart = flight.StartDateAndTime.AddHours(-3);
        //            var currentDateTime = DateTime.Now;
        //            if (currentDateTime.Date > flightStart.Date ||
        //                (currentDateTime.Date == flightStart.Date &&
        //                currentDateTime.TimeOfDay > flightStart.TimeOfDay))
        //            {
        //                // smatra se da je korisnik odbio poziv na let
        //                _context.FlightInvitations.Remove(flightInvitation);

        //                var invitationFromUser =  await _context.ApplicationUsers
        //                    .Include(x => x.ReservedFlights)
        //                        .ThenInclude(y => y.Passengers)
        //                    .FirstOrDefaultAsync(x => x.UserName == flightInvitation.InvitationFromUser);

        //                var passenger = invitationFromUser.ReservedFlights
        //                    .FirstOrDefault(x => x.FlightId == flightId)
        //                    .Passengers
        //                    .FirstOrDefault(x => x.User_Username == user.UserName);

        //                _context.Passengers.Remove(passenger);

        //                var seat = flight.Rows.FirstOrDefault(x => x.Id == passenger.RowId)
        //                    .Seats.FirstOrDefault(x => x.Id == passenger.SeatId);

        //                seat.Type = Flight.SeatType.Free;
        //            }
        //        }
        //    }
        //}
    }
}
