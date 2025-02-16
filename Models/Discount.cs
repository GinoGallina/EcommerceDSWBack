using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }        
    }
}
