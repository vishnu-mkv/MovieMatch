using System.ComponentModel.DataAnnotations;

namespace MovieMatch.ViewModels
{
    public class LoginView
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
