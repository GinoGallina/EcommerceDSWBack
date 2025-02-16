using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int Amount { get; set; }
        public int ProductId { get; set; }
        public bool Delivered { get; set; }
        public DateTime? DeliveryDay { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public virtual Product Product { get; set; } = null!;
    }
}
