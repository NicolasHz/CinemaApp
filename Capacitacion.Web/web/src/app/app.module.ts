import { SafeUrlPipe } from './pipes/safeUrl.pipe';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { PipeFilterService } from './services/pipe-filter.service';
import { ActorService } from './services/actor.service';
import { DropdownDirective, DropdownModalDirective, HoverDirective} from './services/dropdown.directive';
import { AppComponent } from './app.component';
import { RoutingModule } from '../routing/routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { PageHeaderComponent} from './page-header/page-header.component';
import {ActorFormComponent} from './actor-form/actor-form.component';
import { MovieService} from './services/movie.service';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GenreService} from './services/genre.service';
import { GenreFormComponent } from './genre-form/genre-form.component';
import { MoviesFormComponent } from './movie-form/movies-form.component';
import { NotfoundComponent } from './not-found/notfound.component';
import { MoviefilterPipe } from './pipes/moviefilter.pipe';
import { GenreCounterComponent } from './genre-counter/genre-counter.component';
import { LoaderComponent } from './loader/loader.component';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorDetailsComponent  } from './actor-details/actor-details.component';

@NgModule({
  declarations: [
      AppComponent,
      PageHeaderComponent,
      ActorsListComponent,
      ActorDetailsComponent,
      MovieInfoComponent,
      MoviesListComponent,
      MovieDetailsComponent,
      MoviesFormComponent,
      ActorFormComponent,
      GenreFormComponent,
      NotfoundComponent,
      DropdownDirective,
      DropdownModalDirective,
      HoverDirective,
      MoviefilterPipe,
      GenreCounterComponent,
      LoaderComponent,
      SafeUrlPipe
  ],
  imports: [
      BrowserModule,
      HttpModule,
      ReactiveFormsModule,
      FormsModule,
      RoutingModule
  ],
  providers: [
      MovieService,
      GenreService,
      ActorService,
      PipeFilterService
    ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
