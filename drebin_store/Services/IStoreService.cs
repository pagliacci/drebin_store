using drebin_store.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Services
{
    public interface IStoreService
    {
        Task<IEnumerable<Product>> GetProducts();
    }
}
