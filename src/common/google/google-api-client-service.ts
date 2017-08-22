import {Observable} from 'rxjs/Rx';
import {Inject, Injectable, InjectionToken, OpaqueToken} from '@angular/core';

export const GAPI = new InjectionToken('Gapi');

@Injectable()
export class GoogleApiClientService {
    private gapi: any;

    constructor(@Inject(GAPI) gapi, private apiKey: string, private discoveryDocs: string[]) {
        this.gapi = gapi;
    }

    public onLoad(callback: () => any) {
        this.loadClient().subscribe(callback);
    }

    private initClient(callback: () => void): void {
        this.gapi.client.init({
            'apiKey': this.apiKey,
            'discoveryDocs': this.discoveryDocs
        }).then(function () {
            callback();
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

    private loadClient(): Observable<void> {
        return Observable.create((observer: any) => {
            if (this.gapi.client) {
                this.initClient(observer.next);
            } else {
                this.gapi.load('client', () => {
                    this.initClient(observer.next);
                });
            }
        });
    }
}
