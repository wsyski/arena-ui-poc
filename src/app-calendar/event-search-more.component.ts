import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from './reducers/reducers';
import * as SearchActions from './actions/search-actions';

@Component({
  selector: 'event-search-more',
  styleUrls: ['./event-search-more.component.css'],
  templateUrl: './event-search-more.component.html'
})
export class EventSearchMoreComponent {

  constructor(private store: Store<fromRoot.State>) {
  }

  showMore() {
    this.store.dispatch(new SearchActions.Search({}));
  }

}
