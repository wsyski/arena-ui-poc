"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_github_routing_1 = require("./app-github.routing");
var app_github_component_1 = require("./app-github.component");
var github_service_1 = require("./github/shared/github.service");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var about_component_1 = require("./about/about.component");
var home_component_1 = require("./home/home.component");
var repo_browser_component_1 = require("./github/repo-browser/repo-browser.component");
var repo_list_component_1 = require("./github/repo-list/repo-list.component");
var repo_detail_component_1 = require("./github/repo-detail/repo-detail.component");
var contact_component_1 = require("./contact/contact.component");
var not_found_component_1 = require("../common/not-found.component");
var always_deny_guard_1 = require("../common/always-deny.guard");
var core_module_1 = require("../core/core.module");
var core_2 = require("@ngx-translate/core");
var portlet_translate_loader_1 = require("../shared/portlet-translate-loader");
var shared_module_1 = require("../shared/shared.module");
var http_1 = require("@angular/http");
exports.getAppGithubModule = function (portletName, portletNamespace, portletConfigurationUrl, translationsUrl) {
    var AppGithubModule = (function () {
        function AppGithubModule(resolver, appConfigService) {
            this.resolver = resolver;
            this.appConfigService = appConfigService;
        }
        AppGithubModule.prototype.ngDoBootstrap = function (appRef) {
            var factory = this.resolver.resolveComponentFactory(app_github_component_1.AppGithubComponent);
            factory.factory.selector = this.appConfigService.getAppSelector();
            appRef.bootstrap(factory);
        };
        AppGithubModule = __decorate([
            core_1.NgModule({
                declarations: [
                    app_github_component_1.AppGithubComponent,
                    about_component_1.AboutComponent,
                    not_found_component_1.NotFoundComponent,
                    repo_browser_component_1.RepoBrowserComponent,
                    repo_list_component_1.RepoListComponent,
                    repo_detail_component_1.RepoDetailComponent,
                    home_component_1.HomeComponent,
                    contact_component_1.ContactComponent
                ],
                imports: [
                    platform_browser_1.BrowserModule,
                    forms_1.FormsModule,
                    forms_1.ReactiveFormsModule,
                    shared_module_1.SharedModule,
                    core_module_1.CoreModule.forRoot(portletName, portletNamespace, portletConfigurationUrl),
                    core_2.TranslateModule.forRoot({
                        loader: {
                            provide: core_2.TranslateLoader,
                            useFactory: function (http) { return new portlet_translate_loader_1.PortletTranslateLoader(http, translationsUrl); },
                            deps: [http_1.Http]
                        }
                    }),
                    router_1.RouterModule.forRoot(app_github_routing_1.rootRouterConfig, { useHash: true })
                ],
                providers: [
                    github_service_1.GithubService,
                    always_deny_guard_1.AlwaysDenyGuard
                ],
                entryComponents: [app_github_component_1.AppGithubComponent]
            })
        ], AppGithubModule);
        return AppGithubModule;
    }());
    return AppGithubModule;
};
