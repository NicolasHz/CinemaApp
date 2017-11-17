import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Genre } from '../models/genre';
import { GenreService } from '../services/genre.service';


@Component({
    selector: 'genre-form',
    templateUrl: 'genre-form.component.html',
    styleUrls: ['genre-form.component.css']
})

export class GenreFormComponent implements OnInit, OnDestroy {
    private genreForm: FormGroup;
    private model: Genre;
    private genres: Genre[] = [];
    private filterSubscription: Subscription;
    private loader = false;
    private editing = false;
    private exists = false;

    constructor(
        private genreService: GenreService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {

        this.genreForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
        });
        this.filterSubscription = this.activatedRoute.params.subscribe(
            (params: Params) => {
        this.genreService.getGenreList()
            .subscribe(genres => {
                this.genres = genres as Genre[];
                if (this.router.url.length > 9) {
                    this.editing = true;
                    this.genreForm.setValue({ 'name': this.genres.find(x => x.id === params['genre']).name });
                }
            });
        });


    }
    onSubmit() {
        this.loader = true;
        this.model = <Genre>this.genreForm.value;
        if (this.editing) {
            this.model.id = this.genres.find(x => x.id === this.activatedRoute.snapshot.params['genre']).id;
            this.genreService.editGenre(this.model, this.model.id).subscribe();
            setTimeout(() => this.router.navigate(['/home']), 2000);
        } else {
            if (this.genres.some(x => x.name === this.model.name)) {
                this.exists = true;
                this.loader = false;
            } else {
                this.genreService.addGenre(this.model).subscribe();
                setTimeout(() => this.router.navigate(['/home']), 2000);
            }
        }
    }
    ngOnDestroy() {
        this.filterSubscription.unsubscribe();
    }

}
