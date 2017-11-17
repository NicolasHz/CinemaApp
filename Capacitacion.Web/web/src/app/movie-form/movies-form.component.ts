import { ActorService } from './../services/actor.service';
import { Actor } from './../models/actor';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';
import { GenreService } from '../services/genre.service';
import { MovieService } from '../services/movie.service';

@Component({
    selector: 'movie-form',
    templateUrl: 'movies-form.component.html',
    styleUrls: ['movie-form.component.css']
})

export class MoviesFormComponent implements OnInit {

    private movies: Movie[] = [];
    private actors: Actor[];
    private genres: Genre[];
    private genre: Genre;
    private filter: string;
    private model: Movie;
    private movieForm: FormGroup;
    private loader: boolean;
    private editing = false;
    constructor(
        private movieService: MovieService,
        private genreService: GenreService,
        private actorService: ActorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.loadGenres();
        this.loadActors();
        this.movieForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'releaseDate': new FormControl(Date, [Validators.required]),
            'runtime': new FormControl(50, [Validators.required]),
            'plot': new FormControl(null, [Validators.required]),
            'video': new FormControl(null, [Validators.required]),
            'coverLink': new FormControl(null, [Validators.required]),
            'genreId': new FormControl(null, [Validators.required]),
            actors: new FormControl(null)
        });

        if (this.router.url.length > 9) {
            this.editing = true;
            this.movieService.getMovies(null)
                .subscribe(movies => {
                    this.movies = movies as Movie[];
                    const movie: Movie = movies.find(x => x.name === this.activatedRoute.snapshot.params['movie']);
                    this.movieForm.setValue({
                        'name': movie.name,
                        'releaseDate': movie.releaseDate,
                        'runtime': movie.runtime,
                        'plot': movie.plot,
                        'video': movie.video,
                        'coverLink': movie.coverLink,
                        'genreId': movie.genre.id,
                        actors: movie.actors
                    });
                });
        }

    }

    onSubmit() {
        this.loader = true;
        this.model = <Movie>this.movieForm.value;
        if (this.editing) {
            this.model.id = this.movies.find(x => x.name === this.activatedRoute.snapshot.params['movie']).id;
            this.movieService.editMovie(this.model, this.model.id).subscribe();  /// FIXME
            setTimeout(() => this.router.navigate(['/home']), 2000);
        } else {
            this.movieService.addMovie(this.model).subscribe();
            setTimeout(() => this.router.navigate(['/home']), 2000);
        }

    }

    loadGenres() {
        this.genreService.getGenres(this.filter).subscribe(data => this.genres = data);
    }

    loadActors() {
        this.actorService.getActors(this.filter).subscribe(data => this.actors = data);
    }
}
