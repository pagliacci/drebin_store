using drebin_store.Database;
using drebin_store.Services.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace drebin_store.Services
{
    public class StoreService : IStoreService
    {
        private readonly DatabaseContext _context;

        public StoreService(DatabaseContext databaseContext)
        {
            _context = databaseContext;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
