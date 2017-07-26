import {Component} from '@angular/core';
import {AppConfigService} from '../../core/app-config-service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public fontColor: string;
    public fontFamily: string;
    public fontSize: number;

    constructor(public appConfigService: AppConfigService) {
        this.fontColor = appConfigService.getAppConfig().portletConfiguration['fontColor'];
        this.fontSize = appConfigService.getAppConfig().portletConfiguration['fontSize'];
        this.fontFamily = appConfigService.getAppConfig().portletConfiguration['fontFamily'];
    }
}
