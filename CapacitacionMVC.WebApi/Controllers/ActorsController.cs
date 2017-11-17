using Capacitacion.Services;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Web.Http;
using Capacitacion.Entities;
namespace Capacitacion.WebApi.Controllers
{
    public class ActorsController : ApiController
    {
        private readonly IActorsService _actorsSvc;


        public ActorsController(IActorsService actorsSvc)
        {
            _actorsSvc = actorsSvc;
        }

        [HttpGet]
        public IHttpActionResult GetActors()
        {
            try
            {
                var actors = _actorsSvc.GetActors().ToList();
                return Ok(actors);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
        }
        [HttpPost]
        public IHttpActionResult AddActor(Actor actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            actor.Id = Guid.NewGuid();
            try
            {
                this._actorsSvc.AddActor(actor);
            }

            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
            catch (DuplicateWaitObjectException ex)
            {
                return InternalServerError(ex);
            }

            return Ok();
        }

        [HttpPut]
        public IHttpActionResult EditActor(Actor actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _actorsSvc.EditActor(actor);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult DeleteActor(Guid id)
        {
            try
            {
                _actorsSvc.DeleteActor(id);
                return Ok();
            }

             catch (KeyNotFoundException ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
