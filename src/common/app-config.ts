import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class AppConfig {
    public portletName: string;
    public portletNamespace: string;
    public portletSettings: any;

    constructor(private http: Http) {
    }

    public load(portletName: string, portletNamespace: string, portletSettingsUrl: string) {
        this.portletName = portletName;
        this.portletNamespace = portletNamespace;
        return new Promise((resolve, reject) => {
            this.http.get(portletSettingsUrl)
                .subscribe(data => {
                    this.portletSettings = data.json();
                    resolve();
                });
        });
    }

    public appSelector() {
        return "app-" + this.portletName.replace(/[_\.]/g, '-') + "#" + this.portletNamespace;
    }
}
