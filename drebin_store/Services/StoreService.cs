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

        public void PlaceOrder(int productId, int userId)
        {
            var user = _context.Users.Find(userId);
            var product = _context.Products.Find(productId);

            product.NumberInStock--;
            user.DrebinPoints -= product.Price;

            var order = new Order
            {
                Product = product,
                User = user,
                OrderState = OrderStateEnum.InProgress,
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

        public async Task<IEnumerable<Order>> GetOrders(int? userId = null, OrderStateEnum? orderState = null)
        {
            return await _context.Orders
                .Where(o => userId == null || o.User.Id == userId)
                .Where(o => orderState == null || o.OrderState == orderState)
                .Include(o => o.User)
                .Include(o => o.Product)
                .OrderBy(o => o.Id)
                .ToListAsync();
        }

        public async Task<Order> CompleteOrder(int orderId, OrderStateEnum orderState)
        {
            var order = await _context.Orders.Include(o => o.Product).SingleOrDefaultAsync(o => o.Id == orderId);
            var product = order.Product;

            if (order == null)
                throw new ApplicationException($"Order with id: {orderId} doesn't exist");

            if (order.OrderState == OrderStateEnum.Completed || order.OrderState == OrderStateEnum.Cancelled)
                throw new ApplicationException("Completed order state cannot be changed");

            if (orderState == OrderStateEnum.Cancelled)
            {
                // TODO: check if separate product update call required
                product.NumberInStock++;
            }

            order.OrderState = orderState;
            order.CompletionTimeStamp = DateTime.UtcNow;

            var updatedOrder = _context.Update(order).Entity;
            _context.SaveChanges();

            return updatedOrder;
        }

        public async Task<Product> UpdateProduct(Product product)
        {
            var existingProduct = await _context.Products.SingleOrDefaultAsync(p => p.Id == product.Id);

            if (existingProduct == null)
                throw new ApplicationException($"Product with id: {product.Id} doesn't exist");

            existingProduct.Price = product.Price;

            return _context.Products.Update(existingProduct).Entity;
        }
    }
}
