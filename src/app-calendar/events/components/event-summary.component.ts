import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'event-summary',
    styleUrls: ['./event-summary.component.css'],
    templateUrl: './event-summary.component.html',
})
export class EventSummaryComponent {
    @Input() event: any;
}
