namespace MovieMatch.Dtos
{
    public class UserSummaryDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
    }

    public class UserDto : UserSummaryDto
    {
        public List<MovieSummaryDto> Movies { get; set; }
    }
}
