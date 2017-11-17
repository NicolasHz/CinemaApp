import { Genre } from './../models/genre';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-genre-counter',
  templateUrl: './genre-counter.component.html',
  styleUrls: ['./genre-counter.component.css']
})
export class GenreCounterComponent implements OnInit {
  @Input() countGenres: Genre[];
  constructor() { }

  ngOnInit() {
  }

}
