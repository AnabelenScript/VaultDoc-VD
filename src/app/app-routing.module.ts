import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout-module/main-layout/main-layout.component';
import { AuthModule } from './features/auth/auth.module';
import { LoginPageComponent } from './features/auth/views/login-page/login-page.component';
import { AuthGuard } from '../app/core/services/auth/auth_guard'; 
import { DashboardPageComponent } from './features/dashboard/views/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}