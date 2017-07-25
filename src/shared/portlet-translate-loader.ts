import {Observable} from 'rxjs/Observable';
import {TranslateLoader} from '@ngx-translate/core';
import {AppConfig} from '../common/app-config';

export function createPortletTranslateLoader(appConfig: AppConfig) {
    return new PortletTranslateLoader(appConfig);
}

export class PortletTranslateLoader implements TranslateLoader {
    constructor(private appConfig: AppConfig) {
    }

    public getTranslation(lang: string): Observable<any> {
        return this.appConfig.portletSettings.map((portletSettings) => portletSettings.translations);
    }
}