import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
    public portletName: string;
    public portletNamespace: string;
    public translationsUrl: string;
    public preferencesUrl: string;

    constructor(portletName: string, portletNamespace: string, translationsUrl: string, preferencesUrl: string) {
        this.portletName = portletName;
        this.portletNamespace = portletNamespace;
        this.translationsUrl = translationsUrl;
        this.preferencesUrl = preferencesUrl;
    }

    appSelector() {
        return "app-" + this.portletName.replace(/[_\.]/g, '-') + "#" + this.portletNamespace;
    }
}
