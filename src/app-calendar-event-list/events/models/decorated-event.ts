import Event = gapi.client.calendar.Event;

const MISSING_EVENT_ICON_URL = require('./missing-event-icon.png');
const ICON_URL_PATTERN = 'https://drive.google.com/uc?export=view&id={0}';
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: '2-digit', month: 'short',  day: 'numeric'
};
const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: '2-digit', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
};

export class DecoratedEvent {
  private static getDateAsString(dateAsString: string, dateTimeAsString: string): string {
    if (dateTimeAsString) {
      return dateTimeAsString;
    } else if (dateAsString) {
      return dateAsString;
    } else {
      return null;
    }
  }

  private static getDateAsLocalizedString(dateAsString: string, dateTimeAsString: string): string {
    if (dateTimeAsString) {
      return new Date(dateTimeAsString).toLocaleString(undefined, DATETIME_FORMAT_OPTIONS);
    } else if (dateAsString) {
      return new Date(dateAsString).toLocaleDateString(undefined, DATE_FORMAT_OPTIONS);
    } else {
      return null;
    }
  }

  constructor(private event: Event) {
  }

  get id(): string {
    return this.event.id;
  }

  get summary(): string {
    return this.event.summary;
  }

  get description(): string {
    return this.event.description;
  }

  get location(): string {
    return this.event.location;
  }

  get startDateAsString(): string {
    return DecoratedEvent.getDateAsString(this.event.start.date, this.event.start.dateTime);
  }

  get startDateAsLocalizedString() {
    return DecoratedEvent.getDateAsLocalizedString(this.event.start.date, this.event.start.dateTime);
  }

  get endDateAsString(): string {
    return DecoratedEvent.getDateAsString(this.event.end.date, this.event.end.dateTime);
  }

  get endDateAsLocalizedString() {
    return DecoratedEvent.getDateAsLocalizedString(this.event.end.date, this.event.end.dateTime);
  }

  get iconUrl(): string {
    let iconUrl = MISSING_EVENT_ICON_URL;
    if (this.event.attachments) {
      let fileIds = this.event.attachments.filter(attachment => {
        if (attachment.mimeType) {
          return attachment.mimeType.match(/^image\//i);
        } else if (attachment.title) {
          return attachment.title.match(/\.(png|jpe?g|gif|ico)$/i);
        } else {
          return false;
        }
      }).map(attachment => attachment.fileId);
      if (fileIds.length > 0) {
        iconUrl = ICON_URL_PATTERN.replace(/\{0\}/, fileIds[0]);
      }
    }
    return iconUrl;
  }
}
