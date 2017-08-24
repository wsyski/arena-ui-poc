export interface CalendarEvent {
  id: string,
  kind: string,
  summary?: string;
  description?: string;
  [x: string]: any
}
