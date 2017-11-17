import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Movie } from '../../app/models/movie';
@Injectable()
export class MovieService {
    private baseUrl: string = 'http://localhost:49715/api';
    private moviesList: Observable<Movie[]>;
    private newMovie: Movie;
    private movie: Observable<Movie>;
    constructor(private http: Http) {
        this.moviesList = this.getAllMovies();
    }

    private getAllMovies() : Observable<Movie[]> {
        return this.http.get(this.baseUrl + '/movies')
            .map((res: Response) => <Movie[]>res.json());
    }

    public getMovies(filter: string): Observable<Movie[]> {
        if (!filter) {
            return this.moviesList;
        }
        return this.moviesList.map(movies => movies.filter(movie => movie.name.startsWith(filter.trim()) ||
                                                             movie.genre.name.startsWith(filter.trim())));
    }
    public getMovie(name:string):Observable<Movie> {
            if (!name){
                return this.movie;
            }
            this.movie = this.moviesList.map(movies=>movies.find(movie=>movie.name == name));
            return this.moviesList.map(movies=>movies.find(movie=>movie.name == name));
    }
    public addMovie(movie : Movie) {
        let body = JSON.stringify(movie);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/movies',body, options)
                //   .map((res:Response) => <Movie>res.json());
	}
    public editMovie(movie: Movie, id: string) {
        let body = JSON.stringify(movie);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl+'/movies'+'/' +id, body, options)
            .map((res: Response) => <Movie>res.json());
    }  
    public deleteMovie (id: string){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers})
        return this.http.delete(this.baseUrl+'/movies' +'/' +id,options)
                         .subscribe((res: Response) => {});
    }
   
    
}