// added routes
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudendcrudComponent } from './studendcrud/studendcrud.component';
const routes: Routes = [
  { path: 'users/new', component: StudendcrudComponent },
  { path: 'users/:id/edit', component: StudendcrudComponent },
  { path: 'users/:id', component: StudendcrudComponent },
  { path: 'users', component: StudendcrudComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
