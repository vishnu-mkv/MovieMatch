using System.ComponentModel.DataAnnotations;

namespace MovieMatch.ViewModels
{
    public class AddMovieView
    {
        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public DateTime ReleasedOn { get; set; }

        [Required]
        public string Director { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public IFormFile Picture { get; set; } = null!;

        [Required]
        [MinLength(1)]
        public int[] Genres { get; set; } = new int[0];
    }

    public class EditMovieView
    {
        [Required]
        public int Id { get; set; }
        public string? Title { get; set; }

        public DateTime? ReleasedOn { get; set; }

        public string? Director { get; set; }

        public string? Description { get; set; }

        public IFormFile? Picture { get; set; }

        [MinLength(1)]
        public int[]? Genres { get; set; }
    }
}
