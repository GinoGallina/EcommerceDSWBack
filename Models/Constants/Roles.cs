
namespace ecommerce_back.Models.Constants
{
    public static class Roles
    {
        public const string Admin = "Admin";
        public const string Seller = "Vendedor";
        public const string User = "Usuario";

        public static bool Validate(string role)
        {
            return !string.IsNullOrEmpty(role) && typeof(Roles).GetFields().Any(f => f.GetValue(null)?.ToString() == role);
        }

        public static List<string> GetRoles()
        {
            var roles = new List<string>();

            foreach (var field in typeof(Roles).GetFields())
            {
                var value = field.GetValue(null)?.ToString();
                if (!string.IsNullOrEmpty(value))
                    roles.Add(value);
            }

            return roles;
        }
    }
}
