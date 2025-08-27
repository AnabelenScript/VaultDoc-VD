import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout-module/main-layout/main-layout.component';
import { AuthModule } from './features/auth/auth.module';
import { LoginPageComponent } from './features/auth/views/login-page/login-page.component';
import { AuthGuard } from '../app/core/services/auth/auth_guard'; 
import { DashboardPageComponent } from './features/dashboard/views/dashboard-page/dashboard-page.component';
import { ConvertPageComponent } from './features/convert/views/convert-page/convert-page.component';
import { GeneratePageComponent } from './features/generate/views/generate-page/generate-page.component';
import { UploadPageComponent } from './features/upload/views/upload-page/upload-page.component';
import { BinPageComponent } from './features/bin/views/bin-page/bin-page.component';
import { ProfilePageComponent } from './features/users/views/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'convert',
        component: ConvertPageComponent
      },
      {
        path: 'generate',
        component: GeneratePageComponent
      },
       {
        path: 'upload',
        component: UploadPageComponent
      },
       {
        path: 'bin',
        component: BinPageComponent
      },
       {
        path: 'profile',
        component: ProfilePageComponent
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