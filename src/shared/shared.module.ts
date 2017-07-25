import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        TranslateModule
    ]
})
export class SharedModule {

    constructor(private translate: TranslateService) {

        translate.setDefaultLang('en');
        /*
        translate.addLangs(["en", "fr"]);
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        */
    }
}
