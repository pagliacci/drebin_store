using drebin_store.WebModels;
using System.Threading.Tasks;

namespace drebin_store.SignalRHubs
{
    public interface ITypedHubClient
    {
        Task UpdateUser(UserDto user);

        Task UpdateProduct(ProductDto product);

        Task UpdateOrder(OrderDto order);
    }
}
