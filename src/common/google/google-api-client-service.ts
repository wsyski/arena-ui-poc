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
            if (this.gapi.client) {
                this.initGapiClient(observer.next);
            } else {
                this.gapi.load('client', () => {
                    this.initGapiClient(observer.next);
                });
            }
        });
    }

    private initGapiClient(callback: (gapiClient: any) => void): void {
        let googleApiKey = this.appConfigService.getApiKey();
        this.gapi.client.init({
            'apiKey': googleApiKey,
            'discoveryDocs': this.discoveryDocs
        }).then(function () {
            callback(this.gapi.client);
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }


}
