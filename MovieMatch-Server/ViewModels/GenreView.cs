using System.ComponentModel.DataAnnotations;

namespace MovieMatch.ViewModels
{
    public class AddGenreView
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public IFormFile Photo { get; set; } = null!;
    }

    public class EditGenreView  {
        [Required]
        public int Id { get; set; }
        public string? Name { get; set; }

        public IFormFile? Photo { get; set; }

    }

}
