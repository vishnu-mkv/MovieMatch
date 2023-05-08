using MovieMatch.Data;
using MovieMatch.Models;

public static class DummyData
{   
    public static void LoadData(ApplicationDbContext dbContext)
    {
        Console.WriteLine("Load Data: " + dbContext.Movies.Count());
        if (dbContext.Movies.Count() > 5)
        {
            return; // dummy data already loaded
        }

        Console.WriteLine("--- Loading data");

        var genres = new List<Genre>
                        {
                            new Genre { Name = "Action", Photo = "https://pbblogassets.s3.amazonaws.com/uploads/2020/06/09100915/John-Wick-Action-Genre-1.jpg" },
                            new Genre { Name = "Comedy", Photo = "https://pbblogassets.s3.amazonaws.com/uploads/2020/06/09103547/three-stooges-1.jpeg" },
                            new Genre { Name = "Horror", Photo = "https://pbblogassets.s3.amazonaws.com/uploads/2020/06/09105436/Halloween-Slasher-2-1.jpg" },
                            new Genre { Name = "Romance", Photo = "https://pbblogassets.s3.amazonaws.com/uploads/2020/06/09114330/Titanic-Romance-Films-1.jpg" },
                            new Genre { Name = "Sci-Fi", Photo = "https://pbblogassets.s3.amazonaws.com/uploads/2022/03/26133224/star-wars.jpg" },
                        };

        dbContext.Genres.AddRange(genres);

        var users = new List<User>
                    {
                        new User
                        {
                            FirstName = "John",
                            LastName = "Doe",
                            Email = "john.doe@example.com",
                            Password = "password",
                            Role = Roles.User
                        },
                        new User
                        {
                            FirstName = "Jane",
                            LastName = "Doe",
                            Email = "jane.doe@example.com",
                            Password = "password",
                            Role = Roles.User
                        },
                        new User
                        {
                            FirstName = "Admin",
                            LastName = "User",
                            Email = "admin@example.com",
                            Password = "password",
                            Role = Roles.User
                        },
                        new User
                        {
                            FirstName = "Super",
                            LastName = "User",
                            Email = "super@example.com",
                            Password = "password",
                            Role = Roles.User
                        }
                    };


        dbContext.Users.AddRange(users);

        var movies = new List<Movie>
                    {
                        new Movie
                        {
                            Title = "The Avengers",
                            ReleasedOn = new DateTime(2012, 5, 4),
                            Director = "Joss Whedon",
                            Description = "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                            User = users[0],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[0], genres[4] },
                            Picture = "https://cdn.marvel.com/content/1x/avengersendgame_lob_crd_05.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[1], Rating = 8, Comment = "Great movie!" },
                                new Review { User = users[2], Rating = 9, Comment = "One of the best superhero movies ever made." },
                            },
                        },
                        new Movie
                        {
                            Title = "The Dark Knight",
                            ReleasedOn = new DateTime(2008, 7, 18),
                            Director = "Christopher Nolan",
                            Description = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                            User = users[1],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[0], genres[2] },
                            Picture = "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[0], Rating = 10, Comment = "One of the best movies ever made." },
                                new Review { User = users[2], Rating = 9, Comment = "Heath Ledger's performance as the Joker is legendary." },
                            },
                        },
                        new Movie
                        {
                            Title = "The Shawshank Redemption",
                            ReleasedOn = new DateTime(1994, 10, 14),
                            Director = "Frank Darabont",
                            Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                            User = users[2],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[2] },
                            Picture = "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[0], Rating = 10, Comment = "One of my favorite movies of all time." },
                                new Review { User = users[1], Rating = 9, Comment = "A classic film that everyone should see." },
                            },
                        },
                        new Movie
                        {
                            Title = "The Godfather",
                            ReleasedOn = new DateTime(1972, 3, 24),
                            User = users[0],
                            Genres = new List<Genre> { genres[3], genres[4] },
                            Director = "Francis Ford Coppola",
                            Description = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                            Status = MovieStatus.Approved,
                            Picture = "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[1], Rating = 9, Comment = "A true classic." },
                                new Review { User = users[3], Rating = 10, Comment = "One of the best movies ever made." },
                            },
                        },

                        new Movie
                        {
                            Title = "The Matrix",
                            ReleasedOn = new DateTime(1999, 3, 31),
                            User = users[3],
                            Genres = new List<Genre> { genres[3], genres[1], genres[4] },
                            Director = "Lana Wachowski, Lilly Wachowski",
                            Description = "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                            Status = MovieStatus.Approved,
                            Picture = "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[2], Rating = 9, Comment = "A groundbreaking movie that redefined sci-fi action." },
                                new Review { User = users[3], Rating = 7, Comment = "A bit too convoluted for my taste, but still entertaining." },
                            },
                        },

                        new Movie
                        {
                            Title = "Forrest Gump",
                            ReleasedOn = new DateTime(1994, 7, 6),
                            Director = "Robert Zemeckis",
                            User = users[2],
                            Genres = new List<Genre> { genres[1], genres[0] },
                            Description = "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
                            Status = MovieStatus.Approved,
                            Picture = "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[3], Rating = 8, Comment = "A heartwarming movie with great performances." },
                                new Review { User = users[0], Rating = 9, Comment = "One of Tom Hanks' best roles." },
                            },
                        },
                        new Movie
                        {
                            Title = "Pulp Fiction",
                            ReleasedOn = new DateTime(1994, 10, 14),
                            Director = "Quentin Tarantino",
                            Description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                            User = users[0],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[0], genres[3] },
                            Picture = "https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[2], Rating = 8, Comment = "Great movie, loved the non-linear storytelling." },
                                new Review { User = users[3], Rating = 10, Comment = "One of the best movies of all time." },
                            },
                        },
                        new Movie
                        {
                            Title = "Harry Potter and the Philosopher's Stone",
                            ReleasedOn = new DateTime(2001, 11, 16),
                            Director = "Chris Columbus",
                            Description = "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
                            User = users[3],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[2], genres[4] },
                            Picture = "https://cdn.britannica.com/82/152982-050-11159CF4/Daniel-Radcliffe-Rupert-Grint-Emma-Watson-Harry.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[0], Rating = 8, Comment = "A great start to a magical journey!" },
                                new Review { User = users[1], Rating = 9, Comment = "I was blown away by the world-building and characters." },
                                new Review { User = users[2], Rating = 7, Comment = "I enjoyed it, but it didn't quite live up to the hype for me." },
                                new Review { User = users[3], Rating = 10, Comment = "One of my all-time favorite movies. Pure magic!" }
                            }
                        },
                        new Movie
                        {
                            Title = "The Wolf of Wall Street",
                            ReleasedOn = new DateTime(2013, 12, 25),
                            Director = "Martin Scorsese",
                            Description = "Based on the true story of Jordan Belfort, from his rise to a wealthy stockbroker living the high life to his fall involving crime, corruption and the federal government.",
                            User = users[1],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[3], genres[4] },
                            Picture = "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_FMjpg_UX1000_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[2], Rating = 9, Comment = "Leo DiCaprio was amazing in this movie!" },
                                new Review { User = users[3], Rating = 8, Comment = "A wild ride from start to finish." },
                                new Review { User = users[0], Rating = 7, Comment = "Not my favorite Scorsese film, but still entertaining." }
                            },
                        },
                        new Movie
                        {
                            Title = "Mad Max: Fury Road",
                            ReleasedOn = new DateTime(2015, 5, 15),
                            Director = "George Miller",
                            Description = "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
                            User = users[3],
                            Status = MovieStatus.Approved,
                            Genres = new List<Genre> { genres[1], genres[2] },
                            Picture = "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                            Reviews = new List<Review>
                            {
                                new Review { User = users[1], Rating = 8, Comment = "A visually stunning film with non-stop action." },
                                new Review { User = users[2], Rating = 9, Comment = "One of the best action movies I've ever seen." },
                                new Review { User = users[0], Rating = 7, Comment = "A solid action movie, but not my favorite." },
                            },
                        }


                    };

        dbContext.Movies.AddRange(movies);

        dbContext.SaveChanges();

        Console.WriteLine("--- completed loading data");

    }
}
