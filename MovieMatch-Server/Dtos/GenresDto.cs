using System.Text.Json.Serialization;

namespace MovieMatch.Dtos
{
    public class GenreSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonConverter(typeof(PhotoUrlConverter))]
        public string Photo { get; set; }
    }

    public class GenreDto : GenreSummaryDto
    {
        public List<MovieSummaryDto> Movies { get; set; }

    }
}
