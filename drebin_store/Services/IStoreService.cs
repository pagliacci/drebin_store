using drebin_store.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Services
{
    public interface IStoreService
    {
        Task<IEnumerable<Product>> GetProducts();
        void PlaceOrder(int productId, int userId);
        Task<IEnumerable<Order>> GetOrders(int? userId = null, OrderStateEnum? orderState = null);
        Task<Order> CompleteOrder(int orderId, OrderStateEnum orderState);
        Task<Product> UpdateProduct(Product product);
    }
}
