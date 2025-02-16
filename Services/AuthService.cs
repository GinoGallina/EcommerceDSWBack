using ecommerce_back.DAL.DB;
using ecommerce_back.Models;
using ecommerce_back.Models.Constants;
using ecommerce_back.Models.DAO;
using ecommerce_back.Models.DAO.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_back.Services
{
    public class AuthService(SignInManager<ApiUser> signInManager, APIContext context, TokenService tokenService)
    {
        private readonly SignInManager<ApiUser> _signInManager = signInManager;
        private readonly APIContext _db = context;
        private readonly TokenService _tokenService = tokenService;

        public async Task<GenericResponse<LoginResponse>> Login(LoginRequest rq)
        {
            var response = new GenericResponse<LoginResponse>();

            if (string.IsNullOrEmpty(rq.Email) || string.IsNullOrEmpty(rq.Password))
                return response.SetError(Messages.Error.FieldsRequired(["Email", "Password"]));

            var user = await _signInManager
                .UserManager
                .Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == rq.Email);

            if (user == null || string.IsNullOrEmpty(user.UserName))
                return response.SetError(Messages.Error.EntityNotFound("Usuario"));


            // TODO: Capax no hace falta en login
            if (!ValidateEmail(rq.Email))
                return response.SetError(Messages.Error.InvalidEmail());

            if (!ValidatePassword(rq.Password))
                return response.SetError(Messages.Error.InvalidPassword());

            var result = await _signInManager.CheckPasswordSignInAsync(user, rq.Password, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                    return response.SetError(Messages.Error.BlockedUser());
                else
                    return response.SetError(Messages.Error.InvalidLogin());
            }

            if (user.Role == null)
                return response.SetError(Messages.Error.UserWithoutRole());

            var expiration = DateTime.Now.AddDays(30);
            var token = _tokenService.GenerateToken(user, user.Role.Name, expiration);

            if (string.IsNullOrEmpty(token))
                return response.SetError(Messages.Error.TokenCreation());

            response.Data = new LoginResponse
            {
                Token = token,
                SessionExpiration = expiration,
                User = new LoginResponse.Item
                {
                    Id = user.Id,
                    Role = user.Role.Name,
                    FullName = user.FullName,
                    Email = user.Email ?? "",
                }
            };
            return response;
        }

        public async Task<GenericResponse> Logout()
        {
            var response = new GenericResponse();

            await _signInManager.SignOutAsync();

            return response;
        }

        public bool IsAdmin()
        {
            var token = _tokenService.GetToken();
            return token.Role == Roles.Admin;
        }

        public bool IsSeller()
        {
            var token = _tokenService.GetToken();
            return token.Role == Roles.Seller;
        }
        public bool IsUser()
        {
            var token = _tokenService.GetToken();
            return token.Role == Roles.User;
        }

        #region Private

        private static bool ValidatePassword(string password)
        {
            if (string.IsNullOrEmpty(password) || password.Length < 8)
                return false;

            string allowedChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
            if (!password.Any(char.IsUpper) || !password.Any(char.IsLower) || !password.Any(char.IsDigit) || !password.Any(allowedChars.Contains))
                return false;

            return true;
        }

        private static bool ValidateEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }

        #endregion
    }
}
