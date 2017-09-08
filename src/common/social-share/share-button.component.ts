import {Component, Input, OnInit} from '@angular/core';
import {Platform, platforms, Properties} from "./platform-utils";

@Component({
  selector: 'share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent implements OnInit {
  @Input() platformName: string;
  platform: Platform;
  @Input() properties: Properties;
  url: string;

  constructor() {

  }
  ngOnInit() {
    this.platform = platforms[this.platformName];
    this.constructUrl();
  }

  click(event: Event) {
    window.open(this.url, 'newwindow', 'width=1070, height=600');
    event.preventDefault();
  }

  constructUrl() {
    this.url = this.platform.url + this.properties.url;
    if (this.platform.properties) {
      for (let key in this.platform.properties) {
        // if the property has been found.
        let val = this.properties[this.platform.properties[key]];
        if (val) {
          this.url += `&${key}=${val}`;
        }
      }
    }
  }
}