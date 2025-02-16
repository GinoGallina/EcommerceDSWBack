using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public int Rate { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public virtual Order Order { get; set; } = null!;
        public virtual ApiUser User { get; set; } = null!;
    }
}
