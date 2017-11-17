using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Capacitacion.Entities
{
    public class Movie : BaseEntity
    {
        public Movie()
        {
            this.Actors = new HashSet<Actor>();
        }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public string Plot { get; set; }

        [Required]
        public string CoverLink { get; set; }
        [Required]
        public string Video { get; set; }

        [Required]
        [Range(30, 300)]
        public int Runtime { get; set; }

        [Required]
        [DisplayName("Genre")]
        public Guid GenreId { get; set; }
        public virtual Genre Genre { get; set; }
     
        
        public virtual ICollection<Actor> Actors { get; set; }
    }
}
