import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AppConfig} from '../core/app-config';

export const APP_CONFIG = new InjectionToken('appConfig');

@Injectable()
export class AppConfigGuard implements CanActivate {
  appConfig: AppConfig;

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig) {
    this.appConfig = appConfig;
  }

  canActivate() {
    return this.appConfig.isValid();
  }
}
