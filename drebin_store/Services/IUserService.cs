using drebin_store.Services.Models;

namespace drebin_store.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);

        User GetById(int id);

        User Create(User user, string password);
    }
}
