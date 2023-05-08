using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieMatch.Dtos;
using MovieMatch.ViewModels;

namespace MovieMatch.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreManager _genreManager;

        public GenresController(IGenreManager genreManager)
        {
            _genreManager = genreManager;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult AddGenre([FromForm] AddGenreView genreView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            GenreSummaryDto genre = _genreManager.AddGenre(genreView);
            return CreatedAtAction(nameof(GetGenre), new { id = genre.Id }, genre);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGenre([FromRoute] int id, [FromForm] EditGenreView genreView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Console.WriteLine(genreView.Id + " " + id);
            if (genreView.Id != id)
            {
                return BadRequest("Invalid genre ID");
            }

            return Ok(_genreManager.UpdateGenre(genreView));

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGenre([FromRoute] int id)
        {
            return Ok(_genreManager.DeleteGenre(id));

        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetGenre([FromRoute] int id)
        {
            return Ok(_genreManager.GetGenre(id));
        }

        [HttpGet()]
        [AllowAnonymous]
        public IActionResult GetGenres()
        {
            return Ok(_genreManager.GetAllGenres());
        }
    }
}
