"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AboutComponent = (function () {
    function AboutComponent(appConfigService) {
        this.appConfigService = appConfigService;
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.fontColor = this.appConfigService.portletConfiguration['fontColor'];
        this.fontSize = this.appConfigService.portletConfiguration['fontSize'];
        this.fontFamily = this.appConfigService.portletConfiguration['fontFamily'];
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'about',
            styleUrls: ['./about.component.css'],
            templateUrl: './about.component.html'
        })
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
