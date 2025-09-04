import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { DashboardPageComponent } from './views/dashboard-page/dashboard-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared-module/shared.module";



@NgModule({
  declarations: [
    DashboardContainerComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
],
  exports: [
    DashboardContainerComponent,
    DashboardPageComponent
  ]
})
export class DashboardModule { }
