export class AppConfig {

    constructor(private portletName: string, private portletNamespace: string, private portletConfiguration: Map<string, any>) {}

    public appSelector() {
        return 'app-' + this.portletName.replace(/[_\.]/g, '-') + '#' + this.portletNamespace;
    }
}

