using AutoMapper;
using MovieMatch.Data;
using MovieMatch.Dtos;
using MovieMatch.Models;
using MovieMatch.ViewModels;

namespace MovieMatch.Managers
{
    public class ReviewManager : IReviewManager
    {
        public IUserManager UserManager { get; }
        public IMovieManager MovieManager { get; }
        public ApplicationDbContext DbContext { get; }
        public IMapper Mapper { get; }

        public ReviewManager(IUserManager userManager, IMovieManager movieManager,
            ApplicationDbContext dbContext, IMapper mapper)
        {
            UserManager = userManager;
            MovieManager = movieManager;
            DbContext = dbContext;
            Mapper = mapper;
        }

        public void checkIfReviewExists(Movie movie, User user)
        {
            var review = DbContext.Reviews.SingleOrDefault(r => r.Movie == movie && r.User == user);
            if (review != null) throw new Exception("The user review already exists for the movie.");
        }


        public ReviewDto AddReview(AddReviewView newReview)
        {
            Movie movie = MovieManager._GetMovie(newReview.MovieId);
            User user = UserManager.GetCurrentUser();

            checkIfReviewExists(movie, user);

            Review review = new Review()
            {
                Movie = movie,
                Rating = newReview.Rating,
                User = user,
                Comment = newReview.Comment,
            };

            DbContext.Reviews.Add(review);
            DbContext.SaveChanges();
            return Mapper.Map<ReviewDto>(review);
        }
    }

    public interface IReviewManager
    {
        public ReviewDto AddReview(AddReviewView newReview);
    }
}
