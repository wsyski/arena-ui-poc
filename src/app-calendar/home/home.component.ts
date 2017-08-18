import {Component, OnInit} from '@angular/core';
import {AppConfigService} from '../../core/app-config-service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public fontColor: string;
    public fontFamily: string;
    public fontSize: number;

    constructor(private appConfigService: AppConfigService) {}

    ngOnInit() {
        this.fontColor = this.appConfigService.portletConfiguration['fontColor'];
        this.fontSize = this.appConfigService.portletConfiguration['fontSize'];
        this.fontFamily = this.appConfigService.portletConfiguration['fontFamily'];
    }
}
