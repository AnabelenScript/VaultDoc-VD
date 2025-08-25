import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout-module/main-layout/main-layout.component';
import { AuthModule } from './features/auth/auth.module';
import { LoginPageComponent } from './features/auth/views/login-page/login-page.component';
import { AuthGuard } from '../app/core/services/auth/auth_guard'; 
import { DashboardPageComponent } from './features/dashboard/views/dashboard-page/dashboard-page.component';
import { FoldersPageComponent } from './features/files/views/folders-page/folders-page.component';
import { FilesPageComponent } from './features/files/views/files-page/files-page.component';

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
        path: 'folders',
        component: FoldersPageComponent
      },
      {
        path: 'files/:id_folder/:folder_name',
        component: FilesPageComponent
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
