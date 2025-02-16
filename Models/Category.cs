using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        //public int? DiscountId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public virtual List<Product> Products { get; set; } = [];
        //public virtual Discount? Discount { get; set; }
    }
}
