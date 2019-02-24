using System;

namespace drebin_store.Services.Models
{
    public class Order
    {
        public int Id { get; set; }

        public User User { get; set; }

        public Product Product { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime OrderTimeStamp { get; set; }

        public DateTime CompletionTimeStamp { get; set; }
    }
}
