using MovieMatch.Dtos;
using MovieMatch.Models;

namespace MovieMatch.ViewModels
{
    public class LoginResponseView
    {
        public string token { get; set; }
        public UserSummaryDto user { get; set; }
    }
}
