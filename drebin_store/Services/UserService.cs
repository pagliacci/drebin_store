using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using drebin_store.Database;
using drebin_store.Services.Exceptions;
using drebin_store.Services.Models;

namespace drebin_store.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _databaseContext;

        public UserService(DatabaseContext context)
        {
            _databaseContext = context;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _databaseContext.Users.SingleOrDefault(u => u.Username == username.ToLower());

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

            if (_databaseContext.Users.Any(u => u.Username == user.Username))
                throw new AppException($"Username \"{user.Username}\" is already taken");

            var (passwordHash, passwordSalt) = CreatePasswordHashes(password);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _databaseContext.Users.Add(user);
            _databaseContext.SaveChanges();

            return user;
        }

        public Task<User> GetById(int id)
        {
            return _databaseContext.Users.FindAsync(id);
        }

        public List<User> GetAll()
        {
            return _databaseContext.Users.ToList();
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
