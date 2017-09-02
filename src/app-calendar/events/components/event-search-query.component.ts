import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as SearchActions from '../actions/event-search-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';

@Component({
  selector: 'event-search-query',
  styleUrls: ['./event-search-query.component.scss'],
  templateUrl: './event-search-query.component.html'
})
export class EventSearchQueryComponent {
  query: FormControl = new FormControl();

  constructor(private store: Store<fromRoot.State>) {
  }

  @Input()
  set value(value: string) {
    this.query.setValue(value, {onlySelf: true, emitEvent: false});
  }

  ngOnInit() {
    this.query
      .valueChanges
      .debounceTime(500)
      .filter(query => query !== this.value)
      .subscribe((query) => this.store.dispatch(new SearchActions.Search({'query': query})))
  }
}
