import { Router } from '@angular/router';
import { PipeFilterService } from './../services/pipe-filter.service';
import { Observable } from 'rxjs/Observable';
import { GenreService } from './../services/genre.service';
import { Component, OnInit } from '@angular/core';
import { Genre } from '../../app/models/genre';
declare var WOW: any;
@Component({
    selector: 'page-header',
    templateUrl: 'page-header.component.html',
    styleUrls: ['page-header.css']
})

export class PageHeaderComponent implements OnInit {
    private genres: Genre[];

    constructor(private genreService: GenreService, private filterService: PipeFilterService, private router: Router) {}


    ngOnInit() {
        this.router.events.subscribe(() => this.loadGenres());
        new WOW().init();
    }

    onDeleteGenre(id: string) {
        this.genreService.deleteGenre(id);
        setTimeout(() => this.loadGenres(), 1000);
    }

    loadGenres() {
        this.genreService.getGenreList()
        .subscribe(genres => {
            this.genres = genres as Genre[];
        });
    }
}
