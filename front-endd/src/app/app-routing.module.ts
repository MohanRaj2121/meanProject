// added routes
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentcrudComponent } from './studentcrud/studentcrud.component';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [
  { path: 'welecome', component:WelcomeComponent},
  { path: 'students/new', component: StudentcrudComponent },
  { path: 'students/:id/edit', component: StudentcrudComponent },
  { path: 'students/:id', component: StudentcrudComponent },
  { path: 'students', component: StudentcrudComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
