using Capacitacion.Entities;
using System;
using System.Collections.Generic;

namespace Capacitacion.Services
{
    public interface IActorsService
    {
        IList<Actor> GetActors();
        IList<Actor> GetActors(List<Guid> ids);
        IList<Actor> SearchActor(string searchValue);
        Actor GetActorById(Guid actorId);
        void AddActor(Actor actor);
        void EditActor(Actor actor);
        void DeleteActor(Guid actorId);
    }
}
