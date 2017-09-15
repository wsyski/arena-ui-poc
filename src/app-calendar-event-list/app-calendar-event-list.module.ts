import {ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app-calendar-event-list.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppConfigService} from '../core/app-config-service';
import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {CoreModule} from '../core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PortletTranslateLoader} from '../shared/portlet-translate-loader';
import {SharedModule} from '../shared/shared.module';
import {Http} from '@angular/http';
import {DISCOVERY_DOCS, GoogleApiClientService} from '../common/google/client-service';
import {GoogleApiCalendarService} from '../common/google/calendar-service';
import {EventDetailComponent} from './events/components/event-detail.component';
import {EventSummaryComponent} from './events/components/event-summary.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './events/reducers/event-reducers';
import {EffectsModule} from '@ngrx/effects';
import {EventDetailEffects} from './events/effects/event-detail-effects';
import {EventSearchEffects} from './events/effects/event-search-effects';
import {AppCalendarEventListComponent} from './app-calendar-event-list.component';
import {EventSearchComponent} from './events/components/event-search.component';
import {EventSearchQueryComponent} from './events/components/event-search-query.component';
import {EventSearchResultCountComponent} from './events/components/event-search-result-count.component';
import {EventSearchResultComponent} from './events/components/event-search-result.component';
import {EventSearchMoreComponent} from './events/components/event-search-more.component';
import {AppCalendarEventListConfig} from './app-calendar-event-list-config';
import {APP_CONFIG, AppConfigGuard} from '../common/app-config.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocialShareModule} from '../common/social-share/social-share.module';
import {EventRegisterModalComponent} from './events/components/event-register-modal.component';
import {BsModalService, ComponentLoaderFactory, ModalModule, PositioningService} from 'ngx-bootstrap';

export const getAppCalendarEventListModule = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string) => {
  @NgModule({
    declarations: [
      AppCalendarEventListComponent,
      EventSearchComponent,
      EventSearchQueryComponent,
      EventDetailComponent,
      EventSummaryComponent,
      EventSearchMoreComponent,
      EventSearchResultComponent,
      EventSearchResultCountComponent,
      EventRegisterModalComponent,
      NotFoundComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ModalModule.forRoot(),
      ReactiveFormsModule,
      SocialShareModule,
      SharedModule,
      CoreModule.forRoot(portletName, portletNamespace, portletConfigurationUrl),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: Http) => new PortletTranslateLoader(http, translationsUrl),
          deps: [Http]
        }
      }),
      RouterModule.forRoot(rootRouterConfig, {useHash: true}),
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([EventDetailEffects, EventSearchEffects]),
    ],
    providers: [
      AppCalendarEventListConfig,
      {provide: APP_CONFIG, useExisting: AppCalendarEventListConfig},
      {provide: DISCOVERY_DOCS, useValue: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']},
      GoogleApiClientService,
      GoogleApiCalendarService,
      AppConfigGuard,
      AlwaysDenyGuard
    ],
    entryComponents: [AppCalendarEventListComponent, EventRegisterModalComponent]
  })
  class AppCalendarEventListModule {
    constructor(private resolver: ComponentFactoryResolver, private appConfigService: AppConfigService) {
    }

    ngDoBootstrap(appRef: ApplicationRef) {
      const factory = this.resolver.resolveComponentFactory(AppCalendarEventListComponent);
      (<any>factory).factory.selector = this.appConfigService.getAppSelector();
      appRef.bootstrap(factory);
    }
  }

  return AppCalendarEventListModule;
};
