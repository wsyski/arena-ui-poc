import {CalendarEvent} from './calendar-event';

export interface CalendarEventListResponse {
    kind: string;
    items: CalendarEvent[];
}
