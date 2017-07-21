import {Injectable} from "@angular/core";
import {Http, Response, ResponseContentType} from "@angular/http";

@Injectable()
export class AppConfig {
    public portletName: string;
    public portletNamespace: string;
    public portletSettings: any;

    constructor(private http: Http) {
    }

    public load(portletName: string, portletNamespace: string, portletSettingsUrl: string): () => Promise<any> {
        this.portletName = portletName;
        this.portletNamespace = portletNamespace;
        return (): Promise<any> => {
            let promise: Promise<any> = new Promise((resolve: any) => {
                this.http.get(portletSettingsUrl, {responseType: ResponseContentType.Json})
                    .subscribe((response: Response) => {
                        this.portletSettings = response.json();
                        console.log(this.portletSettings);
                        resolve();
                    });
            });
            return promise;
        }
    }

    public appSelector() {
        return "app-" + this.portletName.replace(/[_\.]/g, '-') + "#" + this.portletNamespace;
    }
}
