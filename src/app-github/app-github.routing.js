"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var about_component_1 = require("./about/about.component");
var home_component_1 = require("./home/home.component");
var repo_browser_component_1 = require("./github/repo-browser/repo-browser.component");
var repo_list_component_1 = require("./github/repo-list/repo-list.component");
var repo_detail_component_1 = require("./github/repo-detail/repo-detail.component");
var contact_component_1 = require("./contact/contact.component");
var not_found_component_1 = require("../common/not-found.component");
var always_deny_guard_1 = require("../common/always-deny.guard");
exports.rootRouterConfig = [
    { path: '', pathMatch: 'full', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    {
        path: 'github', component: repo_browser_component_1.RepoBrowserComponent,
        children: [
            { path: '', component: repo_list_component_1.RepoListComponent },
            {
                path: ':org', component: repo_list_component_1.RepoListComponent,
                children: [
                    { path: '', component: repo_detail_component_1.RepoDetailComponent },
                    { path: ':repo', component: repo_detail_component_1.RepoDetailComponent }
                ]
            }
        ]
    },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: '**', component: not_found_component_1.NotFoundComponent, canActivate: [always_deny_guard_1.AlwaysDenyGuard] }
];
