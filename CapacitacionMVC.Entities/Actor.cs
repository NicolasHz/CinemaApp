using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Capacitacion.Entities
{
    public class Actor : BaseEntity
    {
        public Actor()
        {
            this.Movie = new HashSet<Movie>();
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PictureLink { get; set; }
        public virtual ICollection<Movie> Movie { get; set; }
    }
}
