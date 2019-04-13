using drebin_store.WebModels;
using System;

namespace drebin_store.WebModels
{
    public class OrderDto
    {
        public int Id { get; set; }

        public UserDto User { get; set; }

        public ProductDto Product { get; set; }

        public OrderStateEnumDto OrderState { get; set; }

        public DateTime OrderTimeStamp { get; set; }

        public DateTime? CompletionTimeStamp { get; set; }
    }
}
