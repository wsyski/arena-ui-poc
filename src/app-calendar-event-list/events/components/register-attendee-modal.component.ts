import {Component} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'register-attendee-modal',
  styleUrls: ['./register-attendee-modal.component.scss'],
  templateUrl: './register-attendee-modal.component.html',
})

export class RegisterAttendeeModalComponent {
  public title: string;
  public list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {
  }
}
