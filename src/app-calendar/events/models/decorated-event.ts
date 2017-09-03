import Event = gapi.client.calendar.Event;

const MISSING_EVENT_ICON_URL = require('./missing-event-icon.png');
const ICON_URL_PATTERN = 'https://drive.google.com/uc?export=view&id={0}';

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
        iconUrl =  ICON_URL_PATTERN.replace(/\{0\}/, fileIds[0]);
      }
    }
    return iconUrl;
  }
}
