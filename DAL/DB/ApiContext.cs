using ecommerce_back.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_back.DAL.DB
{
    public class APIContext(DbContextOptions<APIContext> options) : IdentityDbContext<ApiUser>(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApiUser>().ToTable("User");
            builder.Entity<IdentityRole>().ToTable("Role");
            builder.Ignore<IdentityUserRole<string>>();
            builder.Ignore<IdentityUserToken<string>>();
            builder.Ignore<IdentityUserClaim<string>>();
            builder.Ignore<IdentityUserLogin<string>>();
            builder.Ignore<IdentityRoleClaim<string>>();

            builder.Entity<ApiUser>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<Cart>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<PaymentType>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<Order>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<Discount>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<Review>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<Category>().HasQueryFilter(x => x.DeletedAt == null);
            builder.Entity<Product>().HasQueryFilter(x => x.DeletedAt == null);
        }

        // Entities
        public DbSet<ApiUser> User { get; set; }
        public DbSet<IdentityRole> Role { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<PaymentType> PaymentType { get; set; }
        public DbSet<Discount> Discount { get; set; }
    }

}
