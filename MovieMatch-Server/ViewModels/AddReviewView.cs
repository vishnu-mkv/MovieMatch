using System.ComponentModel.DataAnnotations;

namespace MovieMatch.ViewModels
{
    public class AddReviewView
    {
        [Required]
        public int MovieId { get; set; }
        [Required]  
        [Range(1, 10)]
        public int Rating { get; set; }
        [Required]
        public string Comment { get; set; } = "";
    }
}
