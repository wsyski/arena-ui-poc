import {Observable} from 'rxjs/Observable';
import {TranslateLoader} from '@ngx-translate/core';
import {Http, Response, ResponseContentType} from '@angular/http';

export class PortletTranslateLoader implements TranslateLoader {
    constructor(private http: Http, private translationsUrl: string) {}

    public getTranslation(lang: string): Observable<any> {
        return this.http.get(this.translationsUrl, {responseType: ResponseContentType.Json}).map((response: Response) => response.json());
    }
}
