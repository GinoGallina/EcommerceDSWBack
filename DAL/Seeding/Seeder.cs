using ecommerce_back.DAL.DB;
using ecommerce_back.Models;
using ecommerce_back.Models.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ecommerce_back.DAL.Seeding
{
    public class Seeder(APIContext db, IConfiguration config, UserManager<ApiUser> userManager, RoleManager<IdentityRole> roleManager) : ISeeder
    {
        private readonly APIContext _db = db;
        private readonly IConfiguration _config = config;
        private readonly UserManager<ApiUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;

        public void Seed()
        {
            try
            {
                if (_db.Database.GetPendingMigrations().Any())
                    _db.Database.Migrate();

                if (_db.Roles.Any(x => x.Name == Roles.Admin))
                    return;

                // Create roles
                foreach (var role in Roles.GetRoles())
                    _roleManager.CreateAsync(new IdentityRole(role)).GetAwaiter().GetResult();

                var adminRoleId = _db.Roles.Where(r => r.Name == Roles.Admin).Select(r => r.Id).FirstOrDefaultAsync().GetAwaiter().GetResult() ?? throw new Exception("No se ha encontrado el rol Admin");
                var sellerRoleId = _db.Roles.Where(r => r.Name == Roles.Seller).Select(r => r.Id).FirstOrDefaultAsync().GetAwaiter().GetResult() ?? throw new Exception("No se ha encontrado el rol Vendedor");
                var userRoleId = _db.Roles.Where(r => r.Name == Roles.Seller).Select(r => r.Id).FirstOrDefaultAsync().GetAwaiter().GetResult()?? throw new Exception("No se ha encontrado el rol usuario");

                // Crate users
                ApiUser admin = new()
                {
                    UserName = _config["AdminEmail"],
                    Email = _config["AdminEmail"],
                    Address = "Brown 1748",
                    EmailConfirmed = true,
                    FullName = "Admin Admin",
                    RoleId = adminRoleId
                };

                ApiUser seller = new()
                {
                    UserName = _config["SellerEmail"],
                    Email = _config["SellerEmail"],
                    Address = "Brown 1748",
                    EmailConfirmed = true,
                    FullName = "Seller Seller",
                    RoleId = sellerRoleId
                };

                ApiUser user = new()
                {
                    UserName = _config["UserEmail"],
                    Email = _config["UserEmail"],
                    Address = "Brown 1748",
                    EmailConfirmed = true,
                    FullName = "User User",
                    RoleId = sellerRoleId
                };

                _userManager.CreateAsync(admin, _config["InitialUsersPassword"] ?? "Password1!").GetAwaiter().GetResult();
                _userManager.CreateAsync(seller, _config["InitialUsersPassword"] ?? "Password1!").GetAwaiter().GetResult();
                _userManager.CreateAsync(user, _config["InitialUsersPassword"] ?? "Password1!").GetAwaiter().GetResult();

            }
            catch (Exception)
            {
                throw;
            }
        }

        #region DB Seed
        #endregion
    }
}
