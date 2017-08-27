import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from './reducers/reducers';
import Event = gapi.client.calendar.Event;

@Component({
    selector: 'event-search-result',
    styleUrls: ['./event-search-result.component.css'],
    templateUrl: './event-search-result.component.html'
})
export class EventSearchResultComponent implements OnInit {
    selectedEvent: Event;
    @Input() events;

    constructor(private store: Store<fromRoot.State>, private router: Router) {
    }

    ngOnInit() {
    }

    onSelect(event: Event): void {
        this.selectedEvent = event;
        this.router.navigate(['/detail', event.id]);
    }
}
