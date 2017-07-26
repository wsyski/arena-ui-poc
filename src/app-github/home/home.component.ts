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

    constructor(private appConfigService: AppConfigService) {
        this.fontColor = appConfigService.portletConfiguration['fontColor'];
        this.fontSize = appConfigService.portletConfiguration['fontSize'];
        this.fontFamily = appConfigService.portletConfiguration['fontFamily'];
    }
}
