import { MovieInfoComponent } from '../app/movie-info/movie-info.component';
import { ActorFormComponent } from '../app/actor-form/actor-form.component';
import { ActorsListComponent } from '../app/actors-list/actors-list.component';
import { GenreFormComponent } from './../app/genre-form/genre-form.component';
import { MoviesFormComponent } from './../app/movie-form/movies-form.component';
import { NotfoundComponent } from './../app/not-found/notfound.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from '../app/movies-list/movies-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: MoviesListComponent },
    { path: 'home/:genre', component: MoviesListComponent },
    { path: 'movie-info/:name', component: MovieInfoComponent},
    { path: 'addmovie', component: MoviesFormComponent },
    { path: 'edit-movie/:movie', component: MoviesFormComponent },
    { path: 'addgenre', component: GenreFormComponent },
    { path: 'edit-genre/:genre', component: GenreFormComponent },
    { path: 'addactor', component: ActorFormComponent },
    { path: 'edit-actor/:actor', component: ActorFormComponent },
    { path: 'actors' , component: ActorsListComponent},
    { path: 'not-found', component: NotfoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [
      RouterModule
    ]
  })
  export class RoutingModule { }
