using Microsoft.AspNetCore.Authorization;

namespace ecommerce_back.Security
{
    public class AuthorizeRolesAttribute(params string[] roles) : IAuthorizationRequirement
    {
        public string Roles { get; } = string.Join(",", roles);
    }
}
