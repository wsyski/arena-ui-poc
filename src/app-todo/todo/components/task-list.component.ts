import {Component, OnInit} from '@angular/core';
import {Task} from '../models/task';
import {TaskService} from '../services/task-service';
import {AppConfigService} from '../../../core/app-config-service';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    providers: [TaskService]
})
export class TaskListComponent implements OnInit {

    fontColor: string;
    fontFamily: string;
    fontSize: number;
    todoCount: number;
    selectedTask: Task;
    tasks: Array<Task>;

    constructor(private _taskService: TaskService, private appConfigService: AppConfigService) {
        this.tasks = _taskService.getTasks();
        this.calculateTodoCount();
    }

    ngOnInit() {
        console.log('Todo component initialized with ' + this.tasks.length + ' tasks.');
        this.fontColor = this.appConfigService.portletConfiguration['fontColor'];
        this.fontSize = this.appConfigService.portletConfiguration['fontSize'];
        this.fontFamily = this.appConfigService.portletConfiguration['fontFamily'];
    }

    calculateTodoCount() {
        this.todoCount = this.tasks.filter(t => !t.done).length;
    }

    select(task: Task) {
        this.selectedTask = task;
    }
}