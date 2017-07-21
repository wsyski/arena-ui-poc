import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-todo",
    templateUrl: "./app-todo.html"
})
export class AppTodoComponent implements OnInit {
    ngOnInit() {
        console.log("Todo application component has been started ...");
    }
}