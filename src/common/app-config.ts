import {Injectable} from '@angular/core';
import {PortletSettings} from './portlet-settings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppConfig {
    public portletName: string;
    public portletNamespace: string;
    public portletSettingsUrl: string;
    public portletSettings: Observable<PortletSettings>;

    constructor(portletName: string, portletNamespace: string, portletSettingsUrl: string) {
        this.portletName = portletName;
        this.portletNamespace = portletNamespace;
        this.portletSettingsUrl = portletSettingsUrl;
    }

    public appSelector() {
        return 'app-' + this.portletName.replace(/[_\.]/g, '-') + '#' + this.portletNamespace;
    }
}

