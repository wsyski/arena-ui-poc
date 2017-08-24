import {CalendarEvent} from './calendar-event';

export interface CalendarEventListResponse {
  kind: string;
  etag: string;
  updated: string;
  summary: string;
  timeZone: string;
  accessRole: string;
  items: CalendarEvent[];
  [x: string]: any
}
