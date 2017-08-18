"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = (function () {
    function HomeComponent(appConfigService) {
        this.appConfigService = appConfigService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.fontColor = this.appConfigService.portletConfiguration['fontColor'];
        this.fontSize = this.appConfigService.portletConfiguration['fontSize'];
        this.fontFamily = this.appConfigService.portletConfiguration['fontFamily'];
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            styleUrls: ['./home.component.css'],
            templateUrl: './home.component.html'
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
