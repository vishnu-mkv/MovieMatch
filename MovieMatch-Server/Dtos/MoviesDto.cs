using System.Text.Json.Serialization;

namespace MovieMatch.Dtos
{
    public class MovieSummaryDto
    {
        public int Id { get; set; }

        public string Title { get; set; } 

        public DateTime ReleasedOn { get; set; }

        public string Director { get; set; }

        public string Description { get; set; }


        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MovieStatus Status { get; set; } = MovieStatus.Waiting;

        public virtual List<GenreSummaryDto> Genres { get; set; }
        
        [JsonConverter(typeof(PhotoUrlConverter))]
        public string Picture { get; set; }


        public int WatchCount { get; set; }

        public double Rating { get; set; }
    }

    public class MovieDto : MovieSummaryDto
    {
        public virtual List<ReviewDto> Reviews { get; set; }
        public virtual UserSummaryDto User { get; set; }

    }
}
