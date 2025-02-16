using Microsoft.AspNetCore.Identity;

namespace ecommerce_back.Models
{
    public class ApiUser : IdentityUser
    {
        public string FullName { get; set; } = null!;
        public string RoleId { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string? Cbu { get; set; } 
        public string? Cuit { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual IdentityRole Role { get; set; } = null!;
        public virtual List<Product> Products { get; set; } = [];
        public virtual List<Cart> Carts { get; set; } = [];

    }
}
