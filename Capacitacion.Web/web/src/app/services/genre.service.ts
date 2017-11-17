import { Movie } from '../models/movie';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Genre } from '../../app/models/genre';
@Injectable()
export class GenreService {
    private readonly baseUrl = 'http://localhost:49715/api';
    private genreList: Observable<Genre[]>;

    constructor(private http: Http) {
        this.genreList = this.getAllGenres();
    }

    getGenreList(): Observable<Genre[]> {
        return this.genreList;
    }

    private getAllGenres(): Observable<Genre[]> {
        return this.http.get(this.baseUrl + '/genres')
            .map((res: Response) => <Genre[]>res.json());
    }

    public getGenres(filter: string): Observable<Genre[]> {
        if (!filter) {
            return this.genreList;
        }

        return this.genreList.map(genres => genres.filter(genre => genre.name.startsWith(filter.trim())));
    }
   
    public addGenre(genre: Genre) {
        let body = JSON.stringify(genre);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/genres', body, options)
                   .map((res: Response) => <Genre>res.json());
	}
    public editGenre(genre: Genre, id: string) {
        let body = JSON.stringify(genre);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + '/genres' + '/' + id, body, options)
            .map((res: Response) => <Genre>res.json());
    }  
    public deleteGenre (id: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions();
        return this.http.delete(this.baseUrl + '/genres/' + id, options)
                    .subscribe((res: Response) => {});
    }


    countMoviesByGenre(genres: Genre[] , movies: Movie[]): any[] {
        const moviesByGenre: any[] = [];
        let aux: string;
        genres.forEach((genre , indexG) => {
            aux = genre.name;
            let count = 0;
            movies.forEach((movie , indexM) => {
                if (movie.genre.name === aux) {
                    count++;
                    moviesByGenre[indexG] = movie.genre.name + ' ' + count;
                }
            });
        });
        moviesByGenre.unshift('All ' + movies.length);
        return moviesByGenre.filter((entry) =>  entry.trim() != '' );
    }
}
