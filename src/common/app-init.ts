import {AppConfig} from "./app-config";
import {Http, Response, ResponseContentType} from "@angular/http";

export function onAppInit(http: Http, appConfig: AppConfig): () => Promise<any> {
    return (): Promise<any> => {
        let promise: Promise<any> = new Promise((resolve: any) => {
            http.get(appConfig.portletSettingsUrl, {responseType: ResponseContentType.Json})
                .subscribe((response: Response) => {
                    appConfig.portletSettings = response.json();
                    console.log(appConfig.portletSettings);
                    resolve();
                });
        });
        return promise;
    }
}

