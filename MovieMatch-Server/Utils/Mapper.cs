using AutoMapper;
using MovieMatch.Dtos;
using MovieMatch.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Add as many of these lines as you need to map your objects
        CreateMap<User, UserDto>();
        CreateMap<User, UserSummaryDto>();

        CreateMap<Genre, GenreDto>();
        CreateMap<Genre, GenreSummaryDto>();

        CreateMap<Review, ReviewDto>();

        CreateMap<Movie, MovieSummaryDto>();

        CreateMap<Movie, MovieDto>();
    }
}