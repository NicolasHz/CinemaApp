using Capacitacion.Data;
using Capacitacion.Services;
using Microsoft.Practices.Unity;
using System.Data.Entity;
using System.Web.Http;
using Unity.WebApi;

namespace Capacitacion.WebApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            container.RegisterType<DbContext, DomainContext>();
            container.RegisterType<IMoviesService, MoviesService>();
            container.RegisterType<IGenresService, GenresService>();
            container.RegisterType<IActorsService, ActorsService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}