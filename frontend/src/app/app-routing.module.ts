import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { ReportsComponent } from './reports/reports.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { authGuard } from './guards/auth.guard';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpPageComponent,
  },
  {
    path: 'user-details',
    canActivate : [authGuard],
    component: UserDetailsComponent,
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'view-page/:customer_id',
    canActivate : [authGuard],
    component: ViewPageComponent,
  },
  {
    path: 'follow-up',
    canActivate : [authGuard],
    component: FollowUpComponent,
  },
  {
    path: 'reports' ,
    canActivate : [authGuard],
    component: ReportsComponent
  },
  {
    path: 'edit/:customer_id' ,
    canActivate : [authGuard],
    component: EditComponent
  },
  {
    path: '**',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
