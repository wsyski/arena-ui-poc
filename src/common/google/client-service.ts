import {Observable} from 'rxjs/Rx';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {AppConfigService} from '../../core/app-config-service';

export const GAPI = new InjectionToken('gapi');
export const DISCOVERY_DOCS = new InjectionToken('discoveryDocs');

@Injectable()
export class GoogleApiClientService {
  private gapi: any;
  private discoveryDocs: string[];

  constructor(@Inject(GAPI) gapi, @Inject(DISCOVERY_DOCS) discoveryDocs: string[], private appConfigService: AppConfigService) {
    this.gapi = gapi;
    this.discoveryDocs = discoveryDocs;
  }

  getGapiClient(): Observable<any> {
    return Observable.create((observer: any) => {
      let gapi = this.gapi;
      let googleApiKey = this.appConfigService.getApiKey();
      let discoveryDocs = this.discoveryDocs;
      if (gapi.client) {
        this.initGapiClient(gapi, observer.next);
      } else {
          gapi.load('client', {
            'callback': function () {
              // this.initGapiClient(gapi, observer.next)
              gapi.client.init({
                'apiKey': googleApiKey,
                'discoveryDocs': discoveryDocs
              }).then(function () {
                observer.next(gapi.client);
              }, function (reason) {
                console.error('gapi.client can not be initialized: ' + reason.result.error.message);
              });
            },
            'onerror': function (error) {
              console.error('gapi.client failed to load');
            }
          });
      }
    });
  }

  private initGapiClient(gapi: any, callback: (gapiClient: any) => void): void {
    let googleApiKey = this.appConfigService.getApiKey();
    gapi.client.init({
      'apiKey': googleApiKey,
      'discoveryDocs': this.discoveryDocs
    }).then(() => {
      callback(gapi.client);
    }, (reason) => {
      console.error('gapi.client can not be initialized: ' + reason.result.error.message);
    });
  }


}
