using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieMatch.Models
{
    public class Review
    {
        public int Id { get; set; }
        //[JsonIgnore]
        public virtual Movie Movie { get; set; }
        public virtual User User { get; set; }
        public int Rating { get; set; }

        [Required]
        public string Comment { get; set; } = null!;
    }
}
