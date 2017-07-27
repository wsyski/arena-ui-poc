import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Task} from '../models/task';

@Component({
    selector: 'task',
    templateUrl: './task.component.html'
})
export class TaskComponent {
    @Input() task: Task;
    @Output() statusChanged: any = new EventEmitter<any>();

    toggleDone() {
        this.task.toggleDone();
        this.statusChanged.emit(null);
    }
}
