using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjectService.Models;
using ProjectService.Models.Users;

namespace ProjectService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _applicationSettings;
        private readonly EmailSender emailSender;

        public ApplicationUserController(DatabaseContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            EmailConfiguration emailConfig,
            IOptions<ApplicationSettings> applicationSettings)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationSettings = applicationSettings.Value;
            emailSender = new EmailSender(emailConfig);
        }

        // POST : api/ApplicationUser/Register
        [HttpPost]
        [Route("Register")]
        public async Task<Object> Register(User user)
        {
            var id = Guid.NewGuid().ToString();
            var applicationUser = new ApplicationUser()
            {
                UserName = user.Username,
                Fullname = user.Fullname,
                Email = user.Email,
                Address = user.Address,
                PhoneNumber = user.Number,
                PassportNumber = user.PassportNumber,
                IdForVerification = id
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, user.Password);
                await _userManager.AddToRoleAsync(applicationUser, user.Type.ToString());

                if (result.Succeeded)
                {
                    Message message = null;
                    if(user.Type == UserType.User)
                        message = new Message(new string[] { user.Email }, "Verify email", $"Click on next link http://localhost:4200/verify-email/{id} to verify your email address.");
                    else if(user.Type == UserType.Admin_Airlines)
                        message = new Message(new string[] { user.Email }, "Verify email", $"You were added as admin for Airlines.\nClick on next link http://localhost:4200/verify-email/{id} to verify your email address.");
                    else if(user.Type == UserType.Admin_RentACarCompanies)
                        message = new Message(new string[] { user.Email }, "Verify email", $"You were added as admin for Rent a car companies.\nClick on next link http://localhost:4200/verify-email/{id} to verify your email address.");

                    emailSender.SendEmail(message);
                }

                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST : api/ApplicationUser/VerifyEmail
        [HttpGet("{id}")]
        [Route("VerifyEmail/{id}")]
        public async Task<IActionResult> VerifyEmail(string id)
        {
            var user = await _context.ApplicationUsers
                .FirstOrDefaultAsync(x => x.IdForVerification == id);

            if(user == null)
            {
                return NotFound();
            }

            user.EmailConfirmed = true;
            user.IdForVerification = null;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Email verified." });
        }

        // POST : api/ApplicationUser/GetRole
        [HttpGet("{id}")]
        [Route("GetRole/{id}")]
        public async Task<IActionResult> GetRole(string id)
        {
            var user = await _context.ApplicationUsers
                .FirstOrDefaultAsync(x => x.IdForVerification == id);

            if (user == null)
            {
                return NotFound();
            }

            var role = await _userManager.GetRolesAsync(user);

            return Ok(new { message = role.FirstOrDefault() });
        }

        // POST : api/ApplicationUser/SetNewPasswordForAdmin
        [HttpPost]
        [Route("SetNewPasswordForAdmin")]
        public async Task<IActionResult> SetNewPasswordForAdmin(AdminPassword model)
        {
            var user = await _context.ApplicationUsers
                .FirstOrDefaultAsync(x => x.IdForVerification == model.Id);

            if(user == null)
            {
                return NotFound();
            }

            user.EmailConfirmed = true;
            user.IdForVerification = null;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, model.Password);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Email verified." });
        }

        // POST : api/ApplicationUser/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && user.EmailConfirmed)
            {
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var role = await _userManager.GetRolesAsync(user);
                    IdentityOptions identityOptions = new IdentityOptions();

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(30),
                        SigningCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)),
                            SecurityAlgorithms.HmacSha256
                            )
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();

                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);

                    return Ok(new { token });
                }
                else
                {
                    return BadRequest(new { message = "Username or password is incorrect." });
                }
            }

            return BadRequest(new { message = "Username or password is incorrect." });
        }

        // POST : api/ApplicationUser/GetUserProfile
        [HttpGet]
        [Route("GetUserProfile")]
        [Authorize(Roles = "User,Admin,Admin_Airlines,Admin_RentACarCompanies")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var user = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            user.Friends.ForEach(x => x.AreFriends = true);

            return new User()
            {
                Fullname = user.Fullname,
                Username = user.UserName,
                Email = user.Email,
                PassportNumber = user.PassportNumber,
                Address = user.Address,
                Number = user.PhoneNumber,
                Friends = user.Friends,
                FriendRequests = user.FriendRequests,
                FriendRequestsSent = user.FriendRequestsSent,
            };
        }

        // PUT: api/ApplicationUser/UpdateUser/Matke
        [HttpPut("{username}")]
        [Route("UpdateUser/{username}")]
        [Authorize(Roles = "User,Admin,Admin_Airlines,Admin_RentACarCompanies")]
        public async Task<IActionResult> PutUser(string username, User user)
        {
            if (username != user.Username)
            {
                return BadRequest();
            }

            var userDB = await _userManager.FindByNameAsync(username);

            if (userDB == null)
            {
                return NotFound();
            }

            userDB.Fullname = user.Fullname;
            userDB.Address = user.Address;
            userDB.PhoneNumber = user.Number;

            try
            {
                await _userManager.UpdateAsync(userDB);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(username))
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

        // PUT: api/ApplicationUser/ChangePassword
        [HttpPut]
        [Route("ChangePassword")]
        [Authorize(Roles = "User,Admin,Admin_Airlines,Admin_RentACarCompanies")]
        public async Task<IActionResult> ChangePassword(PasswordModel password)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (await _userManager.CheckPasswordAsync(user, password.OldPassword))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, password.NewPassword);

                await _userManager.UpdateAsync(user);

                return NoContent();
            }
            else
            {
                return BadRequest(new { message = "Old password is incorrect." });
            }
        }

        // Get: api/ApplicationUser/SearchUsers/username
        [HttpGet("{username}")]
        [Route("SearchUsers/{username}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<Friend>>> SearchUsers(string username)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            List<Friend> friends = new List<Friend>();

            var usersDB = await _context.ApplicationUsers.ToListAsync();

            foreach (var user in usersDB)
            {
                var role = await _userManager.GetRolesAsync(user);

                if (role.FirstOrDefault().Equals(UserType.User.ToString()))
                {
                    if (user.UserName.ToLower().Contains(username.ToLower()) &&
                        !user.UserName.Equals(loggedUser.UserName) &&
                        loggedUser.FriendRequests.FirstOrDefault(x => x.Username == user.UserName) == null &&
                        loggedUser.FriendRequestsSent.FirstOrDefault(x => x.Username == user.UserName) == null)
                    {
                        var areFriends = false;
                        if (loggedUser.Friends.Any(x => x.Username == user.UserName))
                            areFriends = true;

                        friends.Add(new Friend(user.Fullname, user.UserName, user.Email, user.Address, user.PhoneNumber, areFriends));
                    }

                }

            }

            return friends;
        }

        // Get: api/ApplicationUser/SendFriendRequest/username
        [HttpGet("{username}")]
        [Route("SendFriendRequest/{username}")]
        [Authorize(Roles = "User")]
        public async Task<Object> SendFriendRequest(string username)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var friend = await _context.ApplicationUsers
                .Include(x => x.FriendRequests)
                .FirstOrDefaultAsync(x => x.UserName == username);

            loggedUser.FriendRequestsSent
                .Add(new Friend(friend.Fullname,
                                friend.UserName,
                                friend.Email,
                                friend.Address,
                                friend.PhoneNumber,
                                false));

            friend.FriendRequests
                .Add(new Friend(loggedUser.Fullname, 
                                loggedUser.UserName, 
                                loggedUser.Email, 
                                loggedUser.Address, 
                                loggedUser.PhoneNumber, 
                                false));

            await _userManager.UpdateAsync(loggedUser);
            await _userManager.UpdateAsync(friend);

            loggedUser.Friends.ForEach(x => x.AreFriends = true);

            return new User()
            {
                Friends = loggedUser.Friends,
                FriendRequests = loggedUser.FriendRequests,
                FriendRequestsSent = loggedUser.FriendRequestsSent
            };
        }

        // Get: api/ApplicationUser/CancelFriendRequest/username
        [HttpGet("{username}")]
        [Route("CancelFriendRequest/{username}")]
        [Authorize(Roles = "User")]
        public async Task<Object> CancelFriendRequest(string username)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var friend = await _context.ApplicationUsers
                .Include(x => x.FriendRequests)
                .FirstOrDefaultAsync(x => x.UserName == username);

            loggedUser.FriendRequestsSent.RemoveAll(x => x.Username == friend.UserName);
            friend.FriendRequests.RemoveAll(x => x.Username == loggedUser.UserName);

            await _userManager.UpdateAsync(loggedUser);
            await _userManager.UpdateAsync(friend);

            loggedUser.Friends.ForEach(x => x.AreFriends = true);

            return new User()
            {
                Friends = loggedUser.Friends,
                FriendRequests = loggedUser.FriendRequests,
                FriendRequestsSent = loggedUser.FriendRequestsSent
            };
        }

        // Get: api/ApplicationUser/AcceptFriendRequest/username
        [HttpGet("{username}")]
        [Route("AcceptFriendRequest/{username}")]
        [Authorize(Roles = "User")]
        public async Task<Object> AcceptFriendRequest(string username)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var friend = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.UserName == username);

            loggedUser.Friends.Add(new Friend(
                friend.Fullname,
                friend.UserName,
                friend.Email,
                friend.Address,
                friend.PhoneNumber,
                true));
            loggedUser.FriendRequests.RemoveAll(x => x.Username == friend.UserName);

            friend.Friends.Add(new Friend(
                loggedUser.Fullname,
                loggedUser.UserName,
                loggedUser.Email,
                loggedUser.Address,
                loggedUser.PhoneNumber,
                true));
            friend.FriendRequestsSent.RemoveAll(x => x.Username == loggedUser.UserName);

            await _userManager.UpdateAsync(loggedUser);
            await _userManager.UpdateAsync(friend);

            loggedUser.Friends.ForEach(x => x.AreFriends = true);

            return new User() {
                Friends = loggedUser.Friends,
                FriendRequests = loggedUser.FriendRequests,
                FriendRequestsSent = loggedUser.FriendRequestsSent
            };
        }

        // Get: api/ApplicationUser/DeclineFriendRequest/username
        [HttpGet("{username}")]
        [Route("DeclineFriendRequest/{username}")]
        [Authorize(Roles = "User")]
        public async Task<Object> DeclineFriendRequest(string username)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var friend = await _context.ApplicationUsers
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.UserName == username);

            loggedUser.FriendRequests.RemoveAll(x => x.Username == friend.UserName);
            friend.FriendRequestsSent.RemoveAll(x => x.Username == loggedUser.UserName);

            await _userManager.UpdateAsync(loggedUser);
            await _userManager.UpdateAsync(friend);

            loggedUser.Friends.ForEach(x => x.AreFriends = true);

            return new User()
            {
                Friends = loggedUser.Friends,
                FriendRequests = loggedUser.FriendRequests,
                FriendRequestsSent = loggedUser.FriendRequestsSent
            };
        }

        // Get: api/ApplicationUser/DeleteFriend/username
        [HttpGet("{username}")]
        [Route("DeleteFriend/{username}")]
        [Authorize(Roles = "User")]
        public async Task<Object> DeleteFriend(string username)
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            var loggedUser = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .Include(x => x.FriendRequests)
                .Include(x => x.FriendRequestsSent)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var friend = await _context.ApplicationUsers
                .Include(x => x.Friends)
                .FirstOrDefaultAsync(x => x.UserName == username);

            loggedUser.Friends.RemoveAll(x => x.Username == username);

            friend.Friends.RemoveAll(x => x.Username == loggedUser.UserName);

            await _userManager.UpdateAsync(loggedUser);
            await _userManager.UpdateAsync(friend);

            loggedUser.Friends.ForEach(x => x.AreFriends = true);

            return new User()
            {
                Friends = loggedUser.Friends,
                FriendRequests = loggedUser.FriendRequests,
                FriendRequestsSent = loggedUser.FriendRequestsSent
            };
        }

        // Get: api/ApplicationUser/GetFriend/username
        [HttpGet("{username}")]
        [Route("GetFriend/{username}")]
        [Authorize(Roles = "User")]
        public async Task<Object> GetFriend(string username)
        {
            var friend = await _context.ApplicationUsers
                .Include(x => x.FriendRequests)
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (friend == null)
                return NotFound();

            return new Friend()
            {
                Fullname = friend.Fullname,
                Username = friend.UserName,
                Email = friend.Email,
                Address = friend.Address,
                Number = friend.PhoneNumber
            };
        }

        private bool UserExists(string username)
        {
            return _userManager.Users.Any(e => e.UserName == username);
        }

    }
}