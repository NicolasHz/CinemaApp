using System;
using System.ComponentModel.DataAnnotations;

namespace Capacitacion.Entities
{
    public class BaseEntity
    {
        [Required]
        public Guid Id { get; set; }

    }
}
