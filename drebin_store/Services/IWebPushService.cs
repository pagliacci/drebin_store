using drebin_store.Services.Models;

namespace drebin_store.Services
{
    public interface IWebPushService
    {
        void SendNotification(User user);
    }
}
