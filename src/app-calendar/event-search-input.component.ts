import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'event-search-input',
    styleUrls: ['./event-search-input.component.css'],
    templateUrl: './event-search-input.component.html'
})
export class EventSearchInputComponent {
    searchTerms: FormControl = new FormControl();

    @Input()
    set value(val: string) {
        this.searchTerms.setValue(val, {onlySelf: true, emitEvent: false});
    }

    @Output() search = new EventEmitter<string>();

    ngOnInit() {
        this.search.emit();
        this.searchTerms
            .valueChanges
            .debounceTime(500)
            .filter(terms => terms !== this.value)
            .subscribe(this.search);
    }
}
