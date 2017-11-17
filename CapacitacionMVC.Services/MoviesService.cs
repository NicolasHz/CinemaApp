using Capacitacion.Data;
using Capacitacion.Entities;
using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Data.Entity;

namespace Capacitacion.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly DomainContext _context;

        public MoviesService(DomainContext context)
        {
            this._context = context;
        }
        public IList<Entities.Actor> GetActors(List<Guid> ids)
        {
            return this._context.Actors.Where(s => ids.Contains(s.Id)).ToList();
        }

        public IList<Movie> GetMovies()
        {
            IList<Movie> movieList = this._context.Movies.ToList();
            if (movieList == null)
            {
                throw new KeyNotFoundException("Movies not found in the server");
            }
            return this._context.Movies.ToList();
        }

        public Movie GetMovieById(Guid id)
        {
            Movie movie = this._context.Movies.Find(id);
            return movie;
        }

        public void AddMovie(Movie movie)
        {
            movie.Genre = this._context.Genres.Find(movie.GenreId);
            if (movie.Id == null)
            {
                throw new KeyNotFoundException("Movie with no ID is invalid");
            }
            if (!(GetMovieById(movie.Id) == null ))
            {
                throw new DuplicateWaitObjectException("Movies not found in the server");
            }

            var actorIDs = movie.Actors.Select(c => c.Id).ToList();
            IEnumerable<Actor> actores = this._context
                .Actors
                .Where(s => actorIDs.Contains(s.Id))
                .ToList();

            movie.Actors.Clear();
            foreach(Actor actor in actores)
            {
                movie.Actors.Add(actor);
            }

            this._context.Movies.Add(movie);
            this._context.SaveChanges();
        }

        public void EditMovie(Movie movie)
        {
            var existingMovie = _context.Movies.Where(s => s.Id == movie.Id).FirstOrDefault<Movie>();
            
            if (existingMovie == null)
            {
                throw new KeyNotFoundException("The movie with " + movie.Id + " doesnt exist in the server");
            }
            else
            {
                
                existingMovie.Name = movie.Name;
                existingMovie.CoverLink = movie.CoverLink;
                existingMovie.Genre = movie.Genre;
                existingMovie.GenreId = movie.GenreId;
                existingMovie.Plot = movie.Plot;
                existingMovie.ReleaseDate = movie.ReleaseDate;
                existingMovie.Runtime = movie.Runtime;
                existingMovie.Video = movie.Video;

                var actorIDs = movie.Actors.Select(c => c.Id).ToList();
                IEnumerable<Actor> actores = this._context
                    .Actors
                    .Where(s => actorIDs.Contains(s.Id))
                    .ToList();
                existingMovie.Actors.Clear();
                foreach(Actor actor in actores)
                {
                    existingMovie.Actors.Add(actor);
                }

                _context.Entry(existingMovie).State = EntityState.Modified;
                _context.Entry(existingMovie.Genre).State = EntityState.Modified;

                _context.SaveChanges();
            }
        
       }

        public void DeleteMovie(Guid movieId)
        {
            var movie = this._context.Movies.Find(movieId);
            if (movie == null)
            {
                throw new KeyNotFoundException("The movie with " + movie.Id + " doesnt exist in the server");
            }
            else
            {
                this._context.Movies.Remove(movie);
                this._context.SaveChanges();
            }
        }

    }
}
