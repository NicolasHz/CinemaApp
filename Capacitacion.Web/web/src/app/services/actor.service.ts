import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Actor } from '../../app/models/actor';
@Injectable()
export class ActorService {
    private baseUrl: string = 'http://localhost:49715/api';
    private actorList: Observable<Actor[]>;

    constructor(private http: Http) {
        this.actorList = this.getAllActors();
    }

    private getAllActors(): Observable<Actor[]> {
        return this.http.get(this.baseUrl + '/actors')
            .map((res: Response) => <Actor[]>res.json());
    }

    public getActors(filter: string): Observable<Actor[]> {
        if (!filter) {
            return this.actorList;
        }

        return this.actorList.map(actors => actors.filter(actor => actor.firstName.startsWith(filter.trim())));
    }

    public addActor(actor : Actor) {
        let body = JSON.stringify(actor);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/actors', body, options)
               //    .map((res: Response) => <Actor>res.json());
	}
    public editActor(actor: Actor, id: string) {
        let body = JSON.stringify(actor);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + '/actors'+ '/' + id, body, options)

    }
    public deleteActor (id: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers})
        return this.http.delete(this.baseUrl + '/actors/' + id, options)
                .subscribe((res: Response) => {});

    }
}
