using ecommerce_back.Models.DAO;
using ecommerce_back.Models.DAO.Auth;
using ecommerce_back.Services;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce_back.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController(AuthService authService) : ControllerBase
    {
        private readonly AuthService _authService = authService;

        [HttpPost]
        public async Task<GenericResponse<LoginResponse>> Login([FromBody] LoginRequest rq)
        {
            return await _authService.Login(rq);
        }


        [HttpPost]
        public async Task<GenericResponse> Logout()
        {
            return await _authService.Logout();
        }
    }
}
