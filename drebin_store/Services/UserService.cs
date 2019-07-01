using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using drebin_store.Database;
using drebin_store.Services.Exceptions;
using drebin_store.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace drebin_store.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IWebPushService _webPushService;

        public UserService(DatabaseContext context, IWebPushService webPushService)
        {
            _databaseContext = context;
            _webPushService = webPushService;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await _databaseContext.Users.SingleOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        public User Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_databaseContext.Users.Any(u => u.Username.ToLower() == user.Username.ToLower()))
                throw new AppException($"Username \"{user.Username}\" is already taken");

            var (passwordHash, passwordSalt) = CreatePasswordHashes(password);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            var savedUser = _databaseContext.Users.Add(user).Entity;
            _databaseContext.SaveChanges();

            return savedUser;
        }

        public async Task<User> Update(User user, int currentUserId)
        {
            var existingUser = await _databaseContext.Users.SingleOrDefaultAsync(u => u.Id == user.Id);
            if (existingUser == null)
                throw new AppException("Not existing user");

            var currentUser = await _databaseContext.Users.SingleOrDefaultAsync(u => u.Id == currentUserId);

            if (user.MainQuestStage != existingUser.MainQuestStage)
            {
                existingUser.BriefingPassed = false;
                existingUser.NumberOfQuestInCurrentAct = 0;
                _webPushService.SendNotification(existingUser, GetNotification(user));
            } else
            {
                existingUser.NumberOfQuestInCurrentAct = user.NumberOfQuestInCurrentAct;
            }
            existingUser.DrebinPoints = user.DrebinPoints;
            existingUser.MainQuestStage = user.MainQuestStage;
            existingUser.VkId = user.VkId;

            if (currentUser.CanManagePermissions && existingUser.Id != currentUser.Id)
            {
                existingUser.CanManageUsers = user.CanManageUsers;
                existingUser.CanManageOrders = user.CanManageOrders;
                existingUser.CanManageProducts = user.CanManageProducts;
                existingUser.CanManagePermissions = user.CanManagePermissions;
            }

            var updatedUser = _databaseContext.Users.Update(existingUser).Entity;
            _databaseContext.SaveChanges();

            return updatedUser;
        }

        private Notification GetNotification(User user)
        {
            return new Notification
            {
                Title = "Проверь кодек!",
                Body = $"{user.Username}, новый брифинг ждёт тебя!",
                Dir = "auto",
                Badge = "https://panfilov.dev/assets/fox_transparent_background.png",
                Image = "https://panfilov.dev/assets/codec/otacon.jpg",
                Renotify = true,
                Lang = "en",
                RequireInteraction = false,
                Vibrate = new[] { 200, 100, 200 },
                Actions = new List<Models.Action>()
            };
        }

        public User GetById(int id)
        {
            return _databaseContext.Users.Single(u => u.Id == id);
        }

        public async Task<List<User>> GetAll()
        {
            return await _databaseContext.Users.ToListAsync();
        }

        public async Task<User> UpdateNotificationData(int userId, string notificationSubscriptionString) {
            var existingUser = await _databaseContext.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (existingUser == null)
                throw new AppException("Not existing user");

            existingUser.NotificationSubscriptionString = notificationSubscriptionString;

            var updatedUser = _databaseContext.Users.Update(existingUser).Entity;
            _databaseContext.SaveChanges();

            return updatedUser;
        }

        private (byte[] passwordHash, byte[] passwordSalt) CreatePasswordHashes(string password)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                return (hmac.ComputeHash(Encoding.UTF8.GetBytes(password)), hmac.Key);
            }
        }

        private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
