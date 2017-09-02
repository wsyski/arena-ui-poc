import Event = gapi.client.calendar.Event;

const MISSING_EVENT_ICON_URL = require('./missing-event-icon.png');

export class DecoratedEvent {

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

  get iconUrl(): string {
    let iconUrl = MISSING_EVENT_ICON_URL;
    if (this.event.attachments) {
      let fileUrls = this.event.attachments.filter(attachment => {
        if (attachment.mimeType) {
          return attachment.mimeType.match(/^image\//i);
        } else if (attachment.title) {
          return attachment.title.match(/\.(png|jpe?g|gif|ico)$/i);
        } else {
          return false;
        }
      }).map(attachment => attachment.fileUrl);
      if (fileUrls.length > 0) {
        iconUrl = fileUrls[0];
      }
    }
    return iconUrl;
  }
}
