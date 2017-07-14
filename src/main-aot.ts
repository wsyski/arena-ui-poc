///<reference path="../typings/index.d.ts"/>

import { platformBrowser }    from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import { AppTodoModuleNgFactory } from '../aot/src/app-todo/app-todo.module.ngfactory';

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppTodoModuleNgFactory);