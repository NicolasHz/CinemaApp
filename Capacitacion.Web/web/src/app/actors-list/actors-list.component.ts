import { PipeFilterService } from '../services/pipe-filter.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Actor } from '../models/actor';
import { ActorService } from '../services/actor.service';

@Component({
    selector: 'actors-list',
    templateUrl: 'actors-list.component.html',
    styleUrls: ['actors-list.component.css']
})

export class ActorsListComponent implements OnInit {
    private actors: Actor[];
    private filter: string;
    constructor(
        private actorService: ActorService,
        private route: ActivatedRoute,
        private filterService: PipeFilterService) {
    }

    ngOnInit() {
        this.loadActors();
    }

    loadActors() {
        this.actorService.getActors(this.filter).subscribe(data => {
            this.actors = data;
        });
    }

    deleteActor(id: string) {
        this.actorService.deleteActor(id);
        setTimeout(() => this.loadActors(), 1000);
    }
}
