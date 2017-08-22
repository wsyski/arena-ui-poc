import {Injectable} from '@angular/core';
import {Http, Response, ResponseContentType} from '@angular/http';

const KEY_GOOGLE_API = 'keyGoogleApi';

@Injectable()
export class AppConfigService {
    public portletName: string;
    public portletNamespace: string;
    public portletConfiguration: Map<string, any>;

    constructor(private http: Http) {
    }

    load(portletName: string, portletNamespace: string, portletConfigurationUrl: string): Promise<any> {
        this.portletName = portletName;
        this.portletNamespace = portletNamespace;
        return new Promise<any>((resolve: any) => {
            this.http.get(portletConfigurationUrl, {responseType: ResponseContentType.Json}).map((response: Response) => response.json())
                .subscribe((portletConfiguration: Map<string, any>) => {
                    console.log(portletConfiguration);
                    this.portletConfiguration = portletConfiguration;
                    resolve(true);
                });
        });
    }

    getAppSelector() {
        return 'app-' + this.portletName.replace(/[_\.]/g, '-') + '#' + this.portletNamespace;
    }

    getApiKey(): string {
        return this.portletConfiguration.get(KEY_GOOGLE_API);
    }
}
