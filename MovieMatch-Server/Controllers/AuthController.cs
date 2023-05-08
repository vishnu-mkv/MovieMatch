using Microsoft.AspNetCore.Mvc;
using MovieMatch.ViewModels;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserManager userManager;

    public AuthController(IUserManager userManager)
    {
        this.userManager = userManager;
    }

    [HttpPost("register")]
    public ActionResult<LoginResponseView> RegisterUser([FromBody] RegisterView register)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var res = userManager.RegisterUser(register);

        return Ok(res);
    }

    [HttpPost("login")]
    public ActionResult<LoginResponseView> LoginUser([FromBody] LoginView login)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var res = userManager.LoginUser(login);

        return Ok(res);
    }
}
