import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input} from '@angular/core';
import { Movie } from '../models/movie';
import {MovieService } from '../services/movie.service';

@Component({
    selector: '[movie-info]',
    templateUrl: 'movie-info.component.html',
    styleUrls: ['movie-info.component.css']
})

export class MovieInfoComponent implements OnInit {
    movie: Movie;

constructor(
     private route: ActivatedRoute,
     private movieService: MovieService
    ) {}

    ngOnInit() {
        const name = this.route.snapshot.params['name'];
        this.movieService.getMovie(name).subscribe((movie) => this.movie = movie);
        
    }
}
