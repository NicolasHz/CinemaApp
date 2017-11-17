using Capacitacion.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Capacitacion.Entities;
using System.Net.Http;
using System.Net;

namespace Capacitacion.WebApi.Controllers
{
    public class MoviesController : ApiController
    {
        private readonly IGenresService _genresSvc;
        private readonly IActorsService _actorsSvc;
        private readonly IMoviesService _moviesSvc;

        public MoviesController(
            IMoviesService moviesSvc,
            IActorsService actorSvc,
            IGenresService genresSvc)
        {
            _moviesSvc = moviesSvc;
            _actorsSvc = actorSvc;
            _genresSvc = genresSvc;
        }

        [HttpGet]
        public IHttpActionResult GetMovies()
        {
            try
            {
                var movies = _moviesSvc.GetMovies();
                return Ok(movies.ToList());

            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }

        }

        [HttpPost]
        public IHttpActionResult AddMovie(Movie movie)
        {
            movie.Id = Guid.NewGuid();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            try
            {
               this._moviesSvc.AddMovie(movie);
               return Ok();
            }
            catch  (KeyNotFoundException ex)
            {
                return NotFound();
            }
            catch (DuplicateWaitObjectException ex)
            {
                return InternalServerError(ex);
            }
            
        }

        [HttpPut]
        public IHttpActionResult EditMovie(Movie movie)
        {
            ICollection<Actor> actor = movie.Actors.ToList();
            movie.Actors.Clear();
            foreach (Actor act in actor)
            {
           
                movie.Actors.Add(act);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                movie.Actors.Union(actor);
                _moviesSvc.EditMovie(movie);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
            }
        [HttpDelete]
        public IHttpActionResult DeleteMovie(Guid id)
        {
            if (id.Equals(String.Empty))
            {
                return BadRequest("The id is required");        
            }

            try
            {
                Movie mov = _moviesSvc.GetMovieById(id);
                _moviesSvc.DeleteMovie(mov.Id);
                return Ok();
            }
            catch(KeyNotFoundException ex)
            {
                return InternalServerError(ex);
            }            
        }
    }
}