import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AlwaysDenyGuard} from "../common/always-deny-guard";
import {NotFoundComponent} from "../common/not-found.component";
import {StaffListComponent} from "./staff/components/staff-list.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";

const routes: Routes = [
  {path: '', pathMatch: 'full',component: TaskListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'staff', component: StaffListComponent},
  {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppTodoRoutingModule {
}
