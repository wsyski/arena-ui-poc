import {Component} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'modal-content',
  template: `
      <div class="modal-header">
          <h4 class="modal-title pull-left">{{title}}</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <ul *ngIf="list.length">
              <li *ngFor="let item of list">{{item}}</li>
          </ul>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
      </div>
  `
})

export class EventRegisterModalComponent {
  public title: string;
  public list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {
  }
}
