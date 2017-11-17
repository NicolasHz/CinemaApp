using Capacitacion.Data;
using Capacitacion.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace Capacitacion.Services
{
    public class GenresService : IGenresService
    {
        private readonly DomainContext _context;

        public GenresService(DomainContext context)
        {
            this._context = context;
        }

        public IList<Genre> GetGenres()
        {
            IList<Genre> genreList = this._context.Genres.ToList();
            if (genreList == null)
            {
                throw new KeyNotFoundException("Movies not found in the server");
            }
            return this._context.Genres.ToList();
        }

        public IList<Genre> SearchGenres(string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue))
            {
                return this._context.Genres.ToList();
            }
            
            return this._context.Genres.Where(p =>
                p.Name.ToLower().StartsWith(searchValue.ToLower().Trim()))
                .ToList();
        }

        public Genre GetGenreById(Guid genreId)
        {
            return this._context.Genres.Find(genreId);
        }

        public void AddGenre(Genre genre)
        {
            genre.Id = Guid.NewGuid();
            if (genre.Id == null)
            {
                throw new KeyNotFoundException("Genre with no ID is invalid");
            }
            if (!(GetGenreById(genre.Id) == null))
            {
                throw new DuplicateWaitObjectException("Genre found in the server");
            }
            this._context.Genres.Add(genre);
            this._context.SaveChanges();
        }

        public void EditGenre(Genre genre)
        {
            var existingGenre = _context.Genres.Where(s => s.Id == genre.Id).FirstOrDefault<Genre>();

            if (existingGenre == null)
            {
                throw new KeyNotFoundException("Genre with the id " + genre.Id + " not found");
            }
            else
            {
                existingGenre.Name = genre.Name;
                _context.Entry(existingGenre).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        public void DeleteGenre(Guid genreId)
        {
            var genre = this._context.Genres.Find(genreId);
            if (genre == null)
            {
                throw new KeyNotFoundException("Genre with the id " + genreId + " not found");
            }
            else
            {
                this._context.Genres.Remove(genre);
                _context.Entry(genre).State = EntityState.Deleted;
                this._context.SaveChanges();
            }
        }
        }
}
