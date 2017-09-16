import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as DetailActions from '../actions/event-detail-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import * as SearchActions from '../actions/event-search-actions';
import {DecoratedEvent} from '../models/decorated-event';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {EventRegisterModalComponent} from './event-register-modal.component';
import {Subscription} from 'rxjs/Subscription';
import Event = gapi.client.calendar.Event;

@Component({
  selector: 'event-detail',
  styleUrls: ['./event-detail.component.scss'],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {

  bsModalRef: BsModalRef;
  decoratedEvent$: Observable<DecoratedEvent>;
  location: string;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>, private title: Title, private modalService: BsModalService) {

    this.decoratedEvent$ = this.store.select(fromRoot.selectedEvent).map((event: Event) => (event) ? new DecoratedEvent(event) : null).share();
    let subscription: Subscription = this.route.params.subscribe(
      params => {
        this.store.dispatch(new DetailActions.Select(params['id']));
      },
      error => console.error(error),
      () => subscription.unsubscribe());
  }

  ngOnInit(): void {
    let subscription: Subscription = this.decoratedEvent$.subscribe((decoratedEvent: DecoratedEvent) => {
        if (decoratedEvent) {
          this.title.setTitle(decoratedEvent.summary);
          this.location = decoratedEvent.location;
        }
      },
      error => console.error(error),
      () => subscription.unsubscribe());
  }

  onClickLocation(): void {
    if (this.location) {
      this.store.dispatch(new SearchActions.Search({'query': this.location}));
    }

  }

  openEventRegisterModalComponent(): void {
    let list = [
      'Open a modal with component',
      'Pass your data',
      'Do something else',
      '...'
    ];
    this.bsModalRef = this.modalService.show(EventRegisterModalComponent);
    this.bsModalRef.content.title = 'Modal with component';
    this.bsModalRef.content.list = list;
    setTimeout(() => {
      list.push('PROFIT!!!');
    }, 2000);
  }
}
