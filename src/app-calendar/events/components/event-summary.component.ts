import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'event-summary',
    styleUrls: ['./event-summary.component.scss'],
    templateUrl: './event-summary.component.html',
})
export class EventSummaryComponent {
    @Input() event: any;
}
