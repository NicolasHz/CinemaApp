import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
    selector: '[actor-details]',
    templateUrl: 'actor-details.component.html',
    styleUrls: ['actor-details.component.css']
})

export class ActorDetailsComponent {

    @Input() actor: Actor;
    @Output() actorToDelete = new EventEmitter<string>();

    onDeleteMovie() {
        this.actorToDelete.emit();
    }
}
