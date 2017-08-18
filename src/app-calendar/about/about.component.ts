import {Component, OnInit} from '@angular/core';
import {AppConfigService} from '../../core/app-config-service';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

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

