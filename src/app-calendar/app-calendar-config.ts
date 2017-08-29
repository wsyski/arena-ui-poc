import {AppConfig} from '../core/app-config';
import {Injectable} from '@angular/core';
import {AppConfigService} from '../core/app-config-service';

const KEY_GOOGLE_API = 'googleApiKey';
const KEY_CALENDAR_ID = 'calendarId';
const KEY_PAGE_SIZE = 'pageSize';

@Injectable()
export class AppCalendarConfig implements AppConfig {

  constructor(private appConfigService: AppConfigService) {
  }

  getPortletName(): string {
    return this.appConfigService.portletName;
  }

  getPortletNamespace(): string {
    return this.appConfigService.portletNamespace;
  }

  getPortletConfiguration(): Map<string, any> {
    return this.appConfigService.portletConfiguration;
  }

  getGoogleApiKey(): string {
    return this.getPortletConfiguration()[KEY_GOOGLE_API];
  }

  getCalendarId(): string {
    return this.getPortletConfiguration()[KEY_CALENDAR_ID];
  }

  getPageSize(): number {
    return this.getPortletConfiguration()[KEY_PAGE_SIZE];
  }

  isValid(): boolean {
    let googleApiKey = this.getGoogleApiKey();
    let calendarId = this.getCalendarId();
    let pageSize = this.getPageSize();
    return !!googleApiKey && googleApiKey !== '' && !!calendarId && calendarId !== '' && pageSize > 0;
  }
}
