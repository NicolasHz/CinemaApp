using Capacitacion.Services;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Web.Http;
using Capacitacion.Entities;
namespace Capacitacion.WebApi.Controllers
{
    public class GenresController : ApiController
    {
        private readonly IGenresService _genresSvc;


        public GenresController(IGenresService genresSvc)
        {
            _genresSvc = genresSvc;
        }

        [HttpGet]
        public IHttpActionResult GetGenres()
        {
            try
            {   
            var genres = _genresSvc.GetGenres().ToList();
            return Ok(genres);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
        }
        [HttpPost]
        public IHttpActionResult AddGenre(Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _genresSvc.AddGenre(genre);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
            catch (DuplicateWaitObjectException ex)
            {
                return InternalServerError(ex);
            }
           
        }

        [HttpPut]
        public IHttpActionResult EditGenre(Genre genre)
        {
            try
            {
                _genresSvc.EditGenre(genre);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult DeleteGenre(Guid id)
        {
            try
            {
                _genresSvc.DeleteGenre(id);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
        }
    }
}
