import {Observable} from 'rxjs/Rx';
import {Inject, Injectable, InjectionToken, NgZone} from '@angular/core';
import {AppConfigService} from '../../core/app-config-service';

export const DISCOVERY_DOCS = new InjectionToken('discoveryDocs');

@Injectable()
export class GoogleApiClientService {
  private discoveryDocs: string[];

  constructor(@Inject(DISCOVERY_DOCS) discoveryDocs: string[], private appConfigService: AppConfigService, private ngZone: NgZone) {
    this.discoveryDocs = discoveryDocs;
  }

  initClient(): Observable<any> {
    return Observable.create((observer: any) => {
      let googleApiKey = this.appConfigService.getApiKey();
      let discoveryDocs = this.discoveryDocs;
      this.ngZone.runOutsideAngular(() => {

        function gapiClientInit(callback: () => void): void {
          gapi.client.init({
            'apiKey': googleApiKey,
            'discoveryDocs': discoveryDocs
          }).then(() => {
            callback();
          }, (reason) => {
            console.error('gapi.client can not be initialized: ' + reason.result.error.message);
          });
        }

        if (gapi.client) {
          gapiClientInit(() => {
            this.ngZone.run(() => {
              observer.next();
              observer.complete();
            });
          })
        } else {
          gapi.load('client', {
            'callback': () => {
              gapiClientInit(() => {
                this.ngZone.run(() => {
                  observer.next();
                  observer.complete();
                });
              })
            },
            'onerror': () => {
              console.error('gapi.client failed to load')
            }
          });
        }
      });
    });
  }
}
