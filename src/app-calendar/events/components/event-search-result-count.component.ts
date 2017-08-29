import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/reducers';

@Component({
    selector: 'event-search-result-count',
    styleUrls: ['./event-search-result-count.component.css'],
    templateUrl: './event-search-result-count.component.html'
})
export class EventSearchResultCountComponent implements OnInit {
    count: Observable<number>;

    constructor(private store: Store<fromRoot.State>) {
        this.count = store.select(fromRoot.selectCount);
    }

    ngOnInit() {
    }

}
