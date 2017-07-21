import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
    public portletName: string;
    public portletNamespace: string;
    public portletSettingsUrl: string;
    public portletSettings: any;

    constructor(portletName: string, portletNamespace: string, portletSettingsUrl: string) {
        this.portletName = portletName;
        this.portletNamespace = portletNamespace;
        this.portletSettingsUrl = portletSettingsUrl;
    }

    public appSelector() {
        return "app-" + this.portletName.replace(/[_\.]/g, '-') + "#" + this.portletNamespace;
    }
}

