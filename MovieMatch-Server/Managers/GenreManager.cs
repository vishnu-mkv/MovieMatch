
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieMatch.Data;
using MovieMatch.Dtos;
using MovieMatch.Migrations;
using MovieMatch.Models;
using MovieMatch.ViewModels;

public interface IGenreManager
{
    public GenreSummaryDto AddGenre(AddGenreView genre);
    public GenreSummaryDto UpdateGenre(EditGenreView genre);
    public GenreSummaryDto DeleteGenre(int id);
    public GenreDto GetGenre(int id);

    public List<GenreSummaryDto> GetAllGenres();
    Genre _GetGenre(int id);
}

namespace MovieMatch.Managers
{
    public class GenreManager : IGenreManager
    {

        private readonly ApplicationDbContext _context;
        private readonly IFileHandler _fileHandler;
        private readonly IMapper mapper;
        private readonly string ImageDirectory = "genres";

        public GenreManager(ApplicationDbContext context, IFileHandler fileHandler,
            IMapper Mapper)
        {
            _context = context;
            _fileHandler = fileHandler;
            mapper = Mapper;
        }

        public GenreDto GetGenre(int id)
        {
            _GetGenre(id);
            var genre = _context.Genres.Include(g => g.Movies).ThenInclude(m => m.Reviews).SingleOrDefault(g => g.Id == id);
            return mapper.Map<GenreDto>(genre);
        }

        public Genre _GetGenre(int id)
        {
            var genre = _context.Genres.SingleOrDefault(g => g.Id == id);

            if (genre == null)
            {
                throw new Exception("Genre not found.");
            }

            return genre;
        }

        public GenreSummaryDto AddGenre(AddGenreView genreView)
        {
            var genre = new Genre
            {
                Name = genreView.Name
            };

            string photoUrl = _fileHandler.Save(ImageDirectory, genreView.Photo);
            genre.Photo = photoUrl;

            _context.Genres.Add(genre);
            _context.SaveChanges();

            return mapper.Map<GenreSummaryDto>(genre);

        }

        public GenreSummaryDto UpdateGenre(EditGenreView genreView)
        {
            var genre = _GetGenre(genreView.Id);

            genre.Name = genreView.Name ?? genre.Name;

            if (genreView.Photo != null)
            {
                _fileHandler.DeleteFile(genre.Photo);
                string photoUrl = _fileHandler.Save(ImageDirectory, genreView.Photo);
                genre.Photo = photoUrl;
            }

            _context.SaveChanges();
            return mapper.Map<GenreSummaryDto>(genre);

        }

        public GenreSummaryDto DeleteGenre(int id)
        {
            var genre = _GetGenre(id);
            _fileHandler.DeleteFile(genre.Photo);

            _context.Genres.Remove(genre);
            _context.SaveChanges();

            return mapper.Map<GenreSummaryDto>(genre);

        }

        public List<GenreSummaryDto> GetAllGenres()
        {
            var genres = _context.Genres;

            return mapper.Map<List<GenreSummaryDto>>(genres);

        }
    }
}
