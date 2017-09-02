import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as SearchActions from '../actions/event-search-actions';
import * as fromRoot from '../reducers/event-reducers';

@Component({
    selector: 'event-summary',
    styleUrls: ['./event-summary.component.scss'],
    templateUrl: './event-summary.component.html',
})
export class EventSummaryComponent {
    @Input() event: any;

    constructor(private store: Store<fromRoot.State>) {
    }

    onClickLocation() {
        this.store.dispatch(new SearchActions.Search({'query': this.event.location}));
    }
}
