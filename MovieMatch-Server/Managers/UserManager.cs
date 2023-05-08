using MovieMatch.Models;
using MovieMatch.ViewModels;
using MovieMatch.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using MovieMatch.Dtos;

namespace MovieMatch.Managers
{
    public class UserManager : IUserManager
    {

        private readonly ISecurePasswordHasher passwordHasher;
        private readonly ApplicationDbContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IMapper mapper;
        private readonly Jwt jwt;

        public UserManager(ISecurePasswordHasher passwordHasher, ApplicationDbContext dbContext,
            IConfiguration Config, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            this.passwordHasher = passwordHasher;
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
            jwt = Config.GetSection("Jwt").Get<Jwt>();
        }

        public LoginResponseView RegisterUser(RegisterView register)
        {
            if (CheckIfUserExists(register.email))
            {
                throw new Exception("User with this email already exists");
            }

            var user = new User
            {
                Email = register.email,
                Password = passwordHasher.Hash(register.password),
                FirstName = register.FirstName,
                LastName = register.LastName,
                Role = Roles.User // default role for new users
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return new LoginResponseView { token = GenerateToken(user), user = mapper.Map<UserSummaryDto>(user) };
        }

        public User? GetUserByEmail(string email)
        {
            return dbContext.Users.SingleOrDefault(u => u.Email == email);
        }

        public bool CheckIfUserExists(string email)
        {
            return dbContext.Users.Any(u => u.Email == email);
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwt.Issuer,
                audience: jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public LoginResponseView LoginUser(LoginView login)
        {
            var user = GetUserByEmail(login.email);

            if (user == null || !passwordHasher.Verify(login.password, user.Password))
            {
                throw new Exception("Invalid email or password");
            }

            return new LoginResponseView { token = GenerateToken(user), user = mapper.Map<UserSummaryDto>(user) };
        }

        public User GetCurrentUser()
        {
            int userId = GetUserId();

            Console.WriteLine(userId);

            return dbContext.Users.Find(userId);
        }

        private int GetUserId()
        {
            var id = httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

            if (id == null) throw new Exception("User is not authenticated.");

            return Convert.ToInt32(id);
        }

        public bool IsOwner(int id)
        {
            if (id != GetUserId())
            {
                throw new Exception("Access denied.");
            }

            return true;
        }
    }
}


public interface IUserManager
{
    public LoginResponseView RegisterUser(RegisterView register);
    public User? GetUserByEmail(string email);
    public bool CheckIfUserExists(string email);

    public string GenerateToken(User user);

    public LoginResponseView LoginUser(LoginView login);

    public User GetCurrentUser();
    public bool IsOwner(int id);
}
