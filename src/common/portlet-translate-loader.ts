import {Observable} from "rxjs/Observable";
import {TranslateLoader} from "@ngx-translate/core";
import {AppConfig} from "./app-config";

export function createPortletTranslateLoader(appConfig: AppConfig) {
    return new PortletTranslateLoader(appConfig);
}

export class PortletTranslateLoader implements TranslateLoader {
    constructor(private appConfig: AppConfig) {}

    public getTranslation(lang: string): Observable<any> {
        return Observable.of(this.appConfig.portletSettings.translations);
    }
}