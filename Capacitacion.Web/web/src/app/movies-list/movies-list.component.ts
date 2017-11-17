import { GenreService } from '../services/genre.service';
import { Genre } from './../models/genre';
import { PipeFilterService } from '../services/pipe-filter.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Movie } from '../models/movie';
import { MovieService} from '../services/movie.service';

@Component({
    selector: 'movies-list',
    templateUrl: 'movies-list.component.html',
    styleUrls: ['movie-list.component.css']
})

export class MoviesListComponent implements OnInit , OnDestroy  {
    private movies: Movie[];
    private genres: Genre[];
    private filter: string;
    private filterSubscription: Subscription;
    private countGenres: any[];
    constructor(
        private movieservice: MovieService,
        private genreService: GenreService,
        private route: ActivatedRoute,
        private filterService: PipeFilterService) {
    }

    ngOnInit() {
        this.filterSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.filter = params['genre'];
                this.loadMovies();
                this.loadGenres();
                setTimeout(() => this.countGenres = this.genreService.countMoviesByGenre(this.genres , this.movies) , 1200);
            });
    }

    loadMovies() {
        this.movieservice.getMovies(this.filter).subscribe(data => {
            this.movies = data; this.filterService.filterString = '';
        });
    }

    deleteMovie(id: string) {
        this.movieservice.deleteMovie(id);
        setTimeout(() => this.loadMovies(), 1000);
    }

    loadGenres() {
        this.genreService.getGenres(this.filter).subscribe(data => {
            this.genres = data; this.filterService.filterString = '';
        });
    }

    ngOnDestroy() {
        this.filterSubscription.unsubscribe();
    }

}
