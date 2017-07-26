import {Injectable} from '@angular/core';
import {AppConfig} from './app-config';
import {Http, Response, ResponseContentType} from '@angular/http';

@Injectable()
export class AppConfigService {
    private appConfig: AppConfig;

    constructor(private http: Http) {
    }

    load(portletName: string, portletNamespace: string, portletConfigurationUrl: string): Promise<any> {
        return new Promise<any>((resolve: any) => {
            this.http.get(portletConfigurationUrl, {responseType: ResponseContentType.Json}).map((response: Response) => response.json())
                .subscribe((portletConfiguration: Map<string, any>) => {
                    console.log(portletConfiguration);
                    this.appConfig = new AppConfig(portletName, portletNamespace, portletConfiguration);
                    resolve(true);
                });
        });
    }


    getAppConfig(): AppConfig {
        return this.appConfig;
    }

}
