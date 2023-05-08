using System.Text.Json.Serialization;

namespace MovieMatch.Models
{
    public class User
    {
        public int Id { get; set; }

        [JsonIgnore]
        public string Password { get; set; } = null!;

        //[JsonIgnore]
        public string Email { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Roles Role { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        //[JsonIgnore]
        public virtual List<Movie> Movies { get; set; } = new List<Movie>();
    }
}

public enum Roles
{
    User, Admin
}