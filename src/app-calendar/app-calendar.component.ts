import {Component} from '@angular/core';
import {CalendarEvent} from '../common/google/calendar-event';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calendar',
  styleUrls: ['./app-calendar.component.css'],
  templateUrl: './app-calendar.component.html',
})
export class AppCalendarComponent {
  selectedCalendarEvent: CalendarEvent;

  calendarEvents: CalendarEvent[] = [
    {id: 'l27cec9q8tgo5l17hg1a1ap121', kind: 'calendar#event', description: 'Event 0'},
    {id: 'l27cec9q8tgo5l17hg1a1ap122', kind: 'calendar#event', description: 'Event 1'},
    {id: 'l27cec9q8tgo5l17hg1a1ap123', kind: 'calendar#event', description: 'Event 2'}
  ];

  constructor(private router: Router) {
  }

  onSelect(calendarEvent: CalendarEvent): void {
    this.selectedCalendarEvent = calendarEvent;
    this.router.navigate(['/detail', calendarEvent.id]);
  }
}
