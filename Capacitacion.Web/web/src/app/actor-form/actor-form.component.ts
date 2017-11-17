import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Actor } from '../models/actor';
import { ActorService } from '../services/actor.service';


@Component({
    selector: 'actor-form',
    templateUrl: 'actor-form.component.html',
    styleUrls: ['actor-form.component.css']
})

export class ActorFormComponent implements OnInit {
    private actorForm: FormGroup;
    private model: Actor;
    private actors: Actor[] = [];
    private loader = false;
    private editing = false;
    constructor(
        private actorService: ActorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.actorForm = new FormGroup({
            'firstname': new FormControl(null, [Validators.required]),
            'lastname': new FormControl(null, [Validators.required]),
            'pictureLink': new FormControl(null, [Validators.required]),
        });
        if (this.router.url.length > 9) {
            this.editing = true;
            this.actorService.getActors(null)
                .subscribe(actors => {
                    this.actors = actors as Actor[];
                    const actor = this.actors.find(x => x.id === this.activatedRoute.snapshot.params['actor']);
                    this.actorForm.setValue({
                        'firstname': actor.firstName,
                        'lastname': actor.lastName,
                        'pictureLink': actor.pictureLink
                    });
                });
        }
    }
    onSubmit() {
        this.loader = true;
        this.model = <Actor>this.actorForm.value;
        if (this.editing) {
            this.model.id = this.actors.find(x => x.id === this.activatedRoute.snapshot.params['actor']).id;
            this.actorService.editActor(this.model, this.model.id).subscribe();
            setTimeout(() => this.router.navigate(['/addactor']), 2000);
        } else {
        this.actorService.addActor(this.model).subscribe();
        setTimeout(() => this.router.navigate(['/addactor']), 2000);
        }
    }
}
