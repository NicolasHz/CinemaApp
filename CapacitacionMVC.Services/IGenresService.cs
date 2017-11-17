using Capacitacion.Entities;
using System;
using System.Collections.Generic;

namespace Capacitacion.Services
{
    public interface IGenresService
    {
        IList<Genre> GetGenres();
        IList<Genre> SearchGenres(string searchValue);
        Genre GetGenreById(Guid genreId);
        void AddGenre(Genre genre);
        void EditGenre(Genre genre);
        void DeleteGenre(Guid genreId);
    }
}
