import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
    public portletNamespace: string;

    constructor( portletNamespace: string ) {
        this.portletNamespace = portletNamespace;
    }
}
