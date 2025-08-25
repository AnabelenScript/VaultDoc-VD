import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../../shared-module/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class MainLayoutModule { }
