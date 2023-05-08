using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieMatch.Models
{
    public class Genre
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        [JsonConverter(typeof(PhotoUrlConverter))]
        public string Photo { get; set; } = null!;

        //[JsonIgnore]
        public virtual List<Movie> Movies { get; set; } = new();
    }
}
