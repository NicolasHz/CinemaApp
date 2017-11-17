import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
    selector: '[movie-details]',
    templateUrl: 'movie-details.component.html',
    styleUrls: ['movie-details.component.css']
})

export class MovieDetailsComponent {

    @Input() movie: Movie;
    @Output() movieToDelete = new EventEmitter<string>();

    onDeleteMovie() {
        this.movieToDelete.emit();
    }

}
