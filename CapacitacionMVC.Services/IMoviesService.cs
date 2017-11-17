using Capacitacion.Entities;
using System;
using System.Collections.Generic;

namespace Capacitacion.Services
{
    public interface IMoviesService
    {
        IList<Movie> GetMovies();
        IList<Actor> GetActors(List<Guid> ids);
        Movie GetMovieById(Guid id);
        void AddMovie(Movie movie);
        void EditMovie(Movie movie);
        void DeleteMovie(Guid movieId);
    }
}
