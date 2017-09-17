import {Component, OnChanges} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {DecoratedEvent} from '../models/decorated-event';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Attendee} from '../models/attendee';

@Component({
  selector: 'register-attendee-modal',
  styleUrls: ['./register-attendee-modal.component.scss'],
  templateUrl: './register-attendee-modal.component.html',
})

export class RegisterAttendeeModalComponent implements OnChanges {
  attendee: Attendee = new Attendee();
  decoratedEvent: DecoratedEvent;
  attendeeForm: FormGroup;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {
    this.createForm();
  }

  private createForm() {
    this.attendeeForm = this.fb.group({
      firstName: '',
      familyName: '',
      email: ''
    });
  }

  ngOnChanges() {
    this.attendeeForm.reset({
      firstName: this.attendee.firstName,
      familyName: this.attendee.familyName,
      email: this.attendee.email
    });
  }


  onSubmit() {
    this.attendee = this.prepareSaveAttendee();
    console.log(this.attendee);
    this.ngOnChanges();
  }

  private prepareSaveAttendee(): Attendee {
    const formModel = this.attendeeForm.value;

    const saveAttendee: Attendee = {
      email: formModel.email as string,
      firstName: formModel.firstName as string,
      familyName: formModel.familyName as string,
    };
    return saveAttendee;
  }

  revert() {
    this.ngOnChanges();
  }
}
