import {Component, OnInit} from "@angular/core";
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: "app-todo",
    templateUrl: "./app-todo.html"
})
export class AppTodoComponent implements OnInit {
    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit() {
        console.log("Todo application component has been started ...");
    }
}