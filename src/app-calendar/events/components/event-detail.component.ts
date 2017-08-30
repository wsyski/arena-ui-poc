import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as DetailActions from '../actions/event-detail-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import Event = gapi.client.calendar.Event;
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'event-detail',
    styleUrls: ['./event-detail.component.css'],
    templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
    event$: Observable<Event>;

    constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {

        this.route.params.subscribe(
            params => {
                this.store.dispatch(new DetailActions.Select(params['id']));
            }
        );

    }

    ngOnInit() {
        this.event$ = this.store.select(fromRoot.selectedEvent);
    }

}
