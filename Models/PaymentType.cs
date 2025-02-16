using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class PaymentType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }  
        public virtual List<Cart> Carts { get; set; } = [];
    }
}
