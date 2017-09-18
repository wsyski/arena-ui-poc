import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {DecoratedEvent} from '../models/decorated-event';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Attendee} from '../models/attendee';

@Component({
  selector: 'register-attendee-modal',
  styleUrls: ['./register-attendee-modal.component.scss', '../../../common/forms/forms.css'],
  templateUrl: './register-attendee-modal.component.html',
})

export class RegisterAttendeeModalComponent implements OnInit {
  attendee: FormGroup;
  decoratedEvent: DecoratedEvent;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.attendee = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      familyName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.attendee);
    this.bsModalRef.hide();
  }

  reset() {
    this.attendee.reset({
      firstName: '',
      familyName: '',
      email: ''
    });
  }
}
