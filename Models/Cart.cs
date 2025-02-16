using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; } = null!;
        public int PaymentTypeId { get; set; }
        public int ApiUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public virtual PaymentType PaymentType { get; set; } = null!;
        public virtual ApiUser User { get; set; } = null!;
        public virtual List<Order> Orders { get; set; } = [];
    }
}
