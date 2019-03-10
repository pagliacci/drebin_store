using drebin_store.Database;
using drebin_store.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return await _context.Products.Where(p => p.NumberInStock > 0).ToListAsync();
        }

        public void Order(int productId, int userId)
        {
            var user = _context.Users.Find(userId);
            var product = _context.Products.Find(productId);

            product.NumberInStock--;
            user.DrebinPoints -= product.Price;

            var order = new Order
            {
                Product = product,
                User = user,
                IsCompleted = false,
                OrderTimeStamp = DateTime.UtcNow
            };

            // TODO: add normal validation, not this junk
            if (user.DrebinPoints < 0)
            {
                throw new Exception("Not enough DPs, dude!");
            }

            if (product.NumberInStock < 0)
            {
                throw new Exception("No product left");
            }

            using (var context = _context)
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        context.Users.Update(user);
                        context.SaveChanges();

                        context.Products.Update(product);
                        context.SaveChanges();

                        context.Orders.Add(order);
                        context.SaveChanges();

                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        // TODO: Handle failure
                    }
                }
            }
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersForUser(int userId)
        {
            return await _context.Orders.Where(o => o.User.Id == userId).ToListAsync();
        }
    }
}
