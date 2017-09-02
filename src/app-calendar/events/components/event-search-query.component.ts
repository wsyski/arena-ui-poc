import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as SearchActions from '../actions/event-search-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'event-search-query',
  styleUrls: ['./event-search-query.component.scss'],
  templateUrl: './event-search-query.component.html'
})
export class EventSearchQueryComponent implements OnInit, OnDestroy {
  queryFormControl: FormControl = new FormControl();
  private subscription: Subscription;

  constructor(private store: Store<fromRoot.State>) {
  }

  @Input()
  set value(value: string) {
    this.queryFormControl.setValue(value, {onlySelf: true, emitEvent: false});
  }

  ngOnInit() {
    this.subscription = this.queryFormControl
      .valueChanges
      .debounceTime(500)
      .filter(query => query !== this.value)
      .subscribe((query) => this.store.dispatch(new SearchActions.Search({'query': query})));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
