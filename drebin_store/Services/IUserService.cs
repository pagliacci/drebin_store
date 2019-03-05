using drebin_store.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);

        User Create(User user, string password);

        Task<User> GetById(int id);

        List<User> GetAll();
    }
}
