using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieMatch.Data;
using MovieMatch.Dtos;
using MovieMatch.Models;
using MovieMatch.ViewModels;

public interface IMovieManager
{
    public MovieSummaryDto AddMovie(AddMovieView movie);
    public MovieSummaryDto UpdateMovie(EditMovieView movieToUpdate);
    public MovieSummaryDto DeleteMovie(int id);
    public MovieDto GetMovie(int id);
    public List<MovieSummaryDto> GetAllMovies();
    Movie _GetMovie(int movieId);
    public List<MovieSummaryDto> GetTopNRated(int N);
    public List<MovieSummaryDto> GetTopNWatched(int N);
    public List<MovieSummaryDto> GetTopNNewest(int N);
    public List<MovieSummaryDto> GetUserMovies();

}

namespace MovieMatch.Managers
{
    public class MovieManager : IMovieManager
    {
        public IUserManager UserManager { get; }
        public ApplicationDbContext DbContext { get; }
        public IFileHandler FileHandler { get; }
        public IMapper Mapper { get; }

        string MovieDirectory = "movies";

        public MovieManager(IUserManager userManager, ApplicationDbContext dbContext,
            IFileHandler fileHandler, IMapper mapper)
        {
            UserManager = userManager;
            DbContext = dbContext;
            FileHandler = fileHandler;
            Mapper = mapper;
        }

        private List<Genre> ParseGenres(int[] genres)
        {
            var parsedGenres = new List<Genre>();

            foreach (var genreId in genres)
            {
                // Find the genre with the specified ID
                var genre = DbContext.Genres.Find(genreId);

                if (genre == null)
                {
                    // If the genre is not found, throw an exception
                    throw new ArgumentException($"Genre with ID {genreId} not found.");
                }

                parsedGenres.Add(genre);
            }

            return parsedGenres;
        }


        public MovieSummaryDto AddMovie(AddMovieView movie)
        {
            var newMovie = new Movie
            {
                Title = movie.Title,
                ReleasedOn = movie.ReleasedOn,
                Director = movie.Director,
                Description = movie.Description,
                Genres = ParseGenres(movie.Genres),
                User = UserManager.GetCurrentUser(),
                Picture = FileHandler.Save(MovieDirectory, movie.Picture)
            };

            // Add the new movie to the database
            DbContext.Movies.Add(newMovie);
            DbContext.SaveChanges();

            return Mapper.Map<MovieSummaryDto>(newMovie);
        }

        public MovieSummaryDto DeleteMovie(int id)
        {
            Movie movie = _GetMovie(id);

            UserManager.IsOwner(movie.User.Id);

            DbContext.Movies.Remove(movie);
            DbContext.SaveChanges();

            return Mapper.Map<MovieSummaryDto>(movie);

        }

        public List<MovieSummaryDto> GetAllMovies()
        {
            var movies = GetPopulatedMovies().ToList();
            return Mapper.Map<List<MovieSummaryDto>>(movies);
        }

        public MovieDto GetMovie(int id)
        {
            var movie = DbContext.Movies.Include(m => m.Genres).Include(m => m.User).Include(m => m.Reviews)
                .ThenInclude(r => r.User).Single(m => m.Id == id);

            if (movie == null) throw new Exception($"Movie with {id} not found.");

            return Mapper.Map<MovieDto>(movie);
        }

        public Movie _GetMovie(int id)
        {
            var movie = DbContext.Movies.Include(m => m.Genres).Include(m => m.User)
                .Include(m => m.Reviews).Single(m => m.Id == id);

            if (movie == null) throw new Exception($"Movie with {id} not found.");

            return movie;

        }

        public MovieSummaryDto UpdateMovie(EditMovieView movieToUpdate)
        {
            // Find the movie with the specified ID
            var movie = _GetMovie(movieToUpdate.Id);

            UserManager.IsOwner(movie.User.Id);

            // Update the movie properties if they are present in the EditMovieView object
            if (!string.IsNullOrWhiteSpace(movieToUpdate.Title))
            {
                movie.Title = movieToUpdate.Title;
            }

            if (movieToUpdate.ReleasedOn != null)
            {
                movie.ReleasedOn = (DateTime)movieToUpdate.ReleasedOn;
            }

            if (!string.IsNullOrWhiteSpace(movieToUpdate.Director))
            {
                movie.Director = movieToUpdate.Director;
            }

            if (!string.IsNullOrWhiteSpace(movieToUpdate.Description))
            {
                movie.Description = movieToUpdate.Description;
            }

            if (movieToUpdate.Picture != null)
            {
                var pic = movie.Picture;
                movie.Picture = FileHandler.Save(MovieDirectory, movieToUpdate.Picture);
                FileHandler.DeleteFile(pic);
            }

            if (movieToUpdate.Genres != null)
            {
                // Parse the genre IDs in the EditMovieView object
                var parsedGenres = ParseGenres(movieToUpdate.Genres);

                // Update the movie genres
                movie.Genres.Clear();
                movie.Genres.AddRange(parsedGenres);
            }

            // Save the changes to the database
            DbContext.SaveChanges();

            return Mapper.Map<MovieSummaryDto>(movie);

        }

        public List<MovieSummaryDto> GetTopNRated(int N = 10)
        {
            var topNRatedMovies = GetPopulatedMovies()
                                        .OrderByDescending(m => m.Rating)
                                        .Take(N)
                                        .ToList();

            return Mapper.Map<List<MovieSummaryDto>>(topNRatedMovies);
        }

        public IEnumerable<Movie> GetPopulatedMovies()
        {
            return DbContext.Movies.Include(m => m.Reviews).Include(m => m.Genres).AsEnumerable();
        }

        public List<MovieSummaryDto> GetTopNWatched(int N = 10)
        {
            var topNWatchedMovies = GetPopulatedMovies()
                                        .OrderByDescending(m => m.WatchCount)
                                        .Take(N)
                                        .ToList();

            return Mapper.Map<List<MovieSummaryDto>>(topNWatchedMovies);
        }

        public List<MovieSummaryDto> GetTopNNewest(int N = 10)
        {
            var topNNewestMovies = DbContext.Movies
                                        .OrderByDescending(m => m.ReleasedOn)
                                        .Take(N)
                                        .ToList();

            return Mapper.Map<List<MovieSummaryDto>>(topNNewestMovies);
        }

        public List<MovieSummaryDto> GetUserMovies()
        {
            var movies = GetPopulatedMovies().Where(m => m.User == UserManager.GetCurrentUser());
            return Mapper.Map<List<MovieSummaryDto>>(movies);
        }
    }
}
