using System.ComponentModel.DataAnnotations;

namespace MovieMatch.ViewModels
{
    public class RegisterView : LoginView
    {
        [Required]
        public string FirstName { get; set; } = null!;

        [Required]
        public string LastName { get; set; } = null!;
    }
}
