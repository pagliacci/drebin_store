using drebin_store.WebModels;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace drebin_store.SignalRHubs
{
    public class SignalRHub : Hub<ITypedHubClient>
    {
        public Task UpdateUser(UserDto user)
        {
            return Clients.All.UpdateUser(user);
        }

        public Task UpdateProduct(ProductDto product)
        {
            return Clients.All.UpdateProduct(product);
        }

        public Task UpdateOrder(OrderDto order)
        {
            return Clients.All.UpdateOrder(order);
        }
    }
}
