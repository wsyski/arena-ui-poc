import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import * as SearchActions from '../actions/event-search-actions';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'event-search-more',
  styleUrls: ['./event-search-more.component.scss'],
  templateUrl: './event-search-more.component.html'
})
export class EventSearchMoreComponent {

  constructor(private store: Store<fromRoot.State>) {
  }

  showMore() {
    this.store.dispatch(new SearchActions.More());
  }

  isShowMore(): Observable<boolean> {
    return this.store.select(fromRoot.isShowMore);
  }

}
