import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'event-search-query',
    styleUrls: ['./event-search-query.component.scss'],
    templateUrl: './event-search-query.component.html'
})
export class EventSearchQueryComponent {
    query: FormControl = new FormControl();

    @Input()
    set value(value: string) {
        this.query.setValue(value, {onlySelf: true, emitEvent: false});
    }

    @Output() search = new EventEmitter<string>();

    ngOnInit() {
        this.search.emit();
        this.query
            .valueChanges
            .debounceTime(500)
            .filter(terms => terms !== this.value)
            .subscribe(this.search);
    }
}
