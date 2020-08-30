using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ProjectService.Models;
using ProjectService.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models
{
    public class DatabaseInitializer
    {
        private DatabaseContext _context;

        public DatabaseInitializer(DatabaseContext context)
        {
            _context = context;
        }

        public async Task Initialize()
        {
            var roles = new List<string>() { "Admin", "Admin_RentACarCompanies", "Admin_Airlines", "User" };

            var roleStore = new RoleStore<IdentityRole>(_context);
            roleStore.AutoSaveChanges = true;

            foreach(var role in roles)
            {
                if(!_context.Roles.Any(x => x.Name == role))
                {
                    await roleStore.CreateAsync(new IdentityRole { Name = role, NormalizedName = role.ToUpper() });
                }
            }

            var user = new ApplicationUser()
            {
                UserName = "Dexter",
                NormalizedUserName = "DEXTER",
                Fullname = "Mihajlo Rohalj",
                Email = "mihajlorohalj97@gmail.com",
                NormalizedEmail = "MIHAJLOROHALJ97@GMAIL.COM",
                EmailConfirmed = true,
                Address = "Sremska Mitrovica",
                PhoneNumber = "0640551693",
                LockoutEnabled = false,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            if(!_context.Users.Any(x => x.UserName == user.UserName))
            {
                var password = new PasswordHasher<ApplicationUser>();
                var hashed = password.HashPassword(user, "dexter9875321");
                user.PasswordHash = hashed;
                var userStore = new UserStore<ApplicationUser>(_context);
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Admin");
            }

            await _context.SaveChangesAsync();
        }
    }
}
