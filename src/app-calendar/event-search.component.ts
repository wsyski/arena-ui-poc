import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Book } from './book-model';

import { Store } from '@ngrx/store';
import * as SearchActions from './search-actions';
import * as fromRoot from './reducers';

@Component({
  selector: 'event-search',
  styleUrls: ['./event-search.component.css'],
  templateUrl: './event-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSearchComponent {
  terms: Observable<string>;
  books: Observable<Book[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.terms = store.select(fromRoot.selectTerms);
    this.books = store.select(fromRoot.selectResults);
  }

  onSearch(terms: string) {
    this.store.dispatch(new SearchActions.Search(terms));
  }
}
