import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {DecoratedEvent} from '../models/decorated-event';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as DetailActions from '../actions/event-detail-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import {Attendee} from '../../../common/google/attendee';
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'register-attendee-modal',
  styleUrls: ['./register-attendee-modal.component.scss', '../../../common/forms/forms.css'],
  templateUrl: './register-attendee-modal.component.html',
})

export class RegisterAttendeeModalComponent implements OnInit {
  attendee: FormGroup;
  decoratedEvent: DecoratedEvent;
  detailError$: Observable<Error>;
  detailError: Error;

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>, public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.detailError$ = this.store.select(fromRoot.detailError).share();
    this.attendee = this.fb.group({
      firstName: new FormControl('Wojciech', [Validators.required]),
      familyName: new FormControl('Syski', [Validators.required]),
      email: new FormControl('wsyski@gmail.com', [Validators.required, Validators.email])
    });
    let subscription: Subscription = this.detailError$.subscribe(
      error => console.log(error == null ? null : error.message),
      error => console.error(error),
      () => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.attendee.value);
    this.store.dispatch(new DetailActions.AddAttendee(this.attendee.value as Attendee));
  }

  reset() {
    this.attendee.reset({
      firstName: '',
      familyName: '',
      email: ''
    });
  }
}
