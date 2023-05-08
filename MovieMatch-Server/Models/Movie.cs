using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieMatch.Models
{
    public class Movie
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public DateTime ReleasedOn { get; set; }

        public string Director { get; set; } = null!;

        public string Description { get; set; } = null!;

        public virtual User User { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MovieStatus Status { get; set; } = MovieStatus.Waiting;
        public virtual List<Genre> Genres { get; set; } = new();
        [JsonConverter(typeof(PhotoUrlConverter))]
        public string Picture { get; set; } = null!;

        public virtual List<Review> Reviews { get; set; } = new();

        [NotMapped]
        public int WatchCount
        {
            get
            {
                return Reviews.Count;
            }
        }

        [NotMapped]
        public double Rating
        {
            get
            {
                if (WatchCount > 0)
                {
                    return Reviews.Average(r => r.Rating);
                }

                return 0;
            }
        }
    }
}

public enum MovieStatus
{
    Deleted, Approved, Waiting, Rejected
}