using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieMatch.Managers;
using MovieMatch.ViewModels;

namespace MovieMatch.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MoviesController : ControllerBase
    {
        public IMovieManager MovieManager { get; }
        public IUserManager UserManager { get; }
        public IReviewManager ReviewManager { get; }

        public MoviesController(IMovieManager MovieManager, IUserManager userManager,
            IReviewManager reviewManager)
        {
            this.MovieManager = MovieManager;
            UserManager = userManager;
            ReviewManager = reviewManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMovies()
        {
            var movies = MovieManager.GetAllMovies();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetMovie([FromRoute] int id)
        {
            var movie = MovieManager.GetMovie(id);
            return Ok(movie);
        }

        [HttpPost("")]
        public IActionResult AddMovie([FromForm] AddMovieView movieView)
        {
            var movie = MovieManager.AddMovie(movieView);
            return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMovie([FromRoute] int id, [FromForm] EditMovieView movieView)
        {
            if (id != movieView.Id)
            {
                return BadRequest();
            }

            var updatedMovie = MovieManager.UpdateMovie(movieView);
            return Ok(updatedMovie);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMovie([FromRoute] int id)
        {
            var movie = MovieManager.DeleteMovie(id);
            return Ok(movie);
        }


        [HttpPost("/api/ratings")]
        public IActionResult AddRating([FromBody] AddReviewView review)
        {
            return Ok(ReviewManager.AddReview(review));
        }

        [HttpGet("/api/dashboard")]
        [AllowAnonymous]
        public IActionResult GetHome()
        {
            return Ok(new object[]
            {
                new
                {
                    title= "Most Watched",
                    movies= MovieManager.GetTopNWatched(3)
                },
                new
                {
                    title= "Trending",
                    movies= MovieManager.GetTopNRated(3)
                },
                new
                {
                    title= "New Movies",
                    movies= MovieManager.GetTopNNewest(3)
                }
            }) ;  
        }

        [HttpGet("my-movies")]
        public IActionResult GetUserMovies()
        {
            return Ok(MovieManager.GetUserMovies());
        }
    }
}
