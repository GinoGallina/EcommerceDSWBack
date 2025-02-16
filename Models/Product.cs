using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Image { get; set; } = null!;
        public int CategoryId { get; set; }
        public int SellerId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public virtual Category Category { get; set; } = null!;
        public virtual ApiUser Seller { get; set; } = null!;

    }
}
