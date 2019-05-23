using drebin_store.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);

        User Create(User user, string password);

        Task<User> Update(User user);

        Task<User> GetById(int id);

        Task<List<User>> GetAll();

        Task<User> UpdateNotificationData(int userId, string notificationSubscriptionString);
    }
}
