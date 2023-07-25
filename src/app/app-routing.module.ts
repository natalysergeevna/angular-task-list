import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPageComponent } from './task/page/list/task-list-page.component';
import { TaskComponent } from './task/page/one/task-one-page.component';

const routes: Routes = [
  { path: '', component: TaskPageComponent },
  { path: 'task/:id', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
