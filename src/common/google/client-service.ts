import {Observable} from 'rxjs/Rx';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {AppConfigService} from '../../core/app-config-service';

export const DISCOVERY_DOCS = new InjectionToken('discoveryDocs');

@Injectable()
export class GoogleApiClientService {
    private discoveryDocs: string[];

    constructor(@Inject(DISCOVERY_DOCS) discoveryDocs: string[], private appConfigService: AppConfigService) {
        this.discoveryDocs = discoveryDocs;
    }

    getGapiClient(): Observable<any> {
        return Observable.create((observer: any) => {
            let googleApiKey = this.appConfigService.getApiKey();
            let discoveryDocs = this.discoveryDocs;
            if (gapi.client) {
                this.initGapiClient(() => {
                    observer.next(gapi.client);
                })
            } else {
                gapi.load('client', {
                    'callback': () => {
                        this.initGapiClient(() => {
                            observer.next(gapi.client);
                        })
                    },
                    'onerror': () => {
                        console.error('gapi.client failed to load')
                    }
                });
            }
        });
    }

    private initGapiClient(callback: () => void): void {
        let googleApiKey = this.appConfigService.getApiKey();
        gapi.client.init({
            'apiKey': googleApiKey,
            'discoveryDocs': this.discoveryDocs
        }).then(() => {
            callback();
        }, (reason) => {
            console.error('gapi.client can not be initialized: ' + reason.result.error.message);
        });
    }


}
