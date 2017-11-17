using Capacitacion.Data;
using Capacitacion.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace Capacitacion.Services
{
    public class ActorsService : IActorsService
    {
        private readonly DomainContext _context;

        public ActorsService(DomainContext context)
        {
            this._context = context;
        }

        public IList<Actor> GetActors()
        {
            IList<Actor> actorList = this._context.Actors.ToList();
            if (actorList == null)
            {
                throw new KeyNotFoundException("Movies not found in the server");
            }
            return actorList;
        }

        public IList<Entities.Actor> SearchActor(string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue))
            {
                return this._context.Actors.ToList();
            }
            
            return this._context.Actors.Where(p =>
                p.FirstName.ToLower().StartsWith(searchValue.ToLower().Trim()))
                .ToList();
        }

        public Entities.Actor GetActorById(Guid actorId)
        {
            return this._context.Actors.Find(actorId);
        }

        public void AddActor(Actor actor)
        {
            if (actor.Id == null)
            {
                throw new KeyNotFoundException("Actor with no ID is invalid");
            }
            if (!(GetActorById(actor.Id) == null))
            {
                throw new DuplicateWaitObjectException("Movies not found in the server");
            }

            this._context.Actors.Add(actor);
            this._context.SaveChanges();
        }

        public void EditActor(Actor actor)
        {

            var existingActor = _context.Actors.Where(s => s.Id == actor.Id).FirstOrDefault<Actor>();
            if (existingActor == null)
            {
                throw new KeyNotFoundException("The actor with " + actor.Id + " doesnt exist in the server");
            }
          else
            {
                existingActor.FirstName = actor.FirstName;
                existingActor.LastName = actor.LastName;
                existingActor.PictureLink = actor.PictureLink;
                _context.Entry(existingActor).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        public void DeleteActor(Guid actorId)
        {
            var actor = this._context.Actors.Find(actorId);
            if (actor == null)
            {
                throw new KeyNotFoundException("The actor with " + actor.Id + " doesnt exist in the server");
            }
           else
            {
                this._context.Actors.Remove(actor);
                _context.Entry(actor).State = EntityState.Deleted;
                this._context.SaveChanges();
            }
        }
        public IList<Entities.Actor> GetActors(List<Guid> ids)
        {
            return this._context.Actors.Where(s => ids.Contains(s.Id)).ToList();
        }
    }

}
