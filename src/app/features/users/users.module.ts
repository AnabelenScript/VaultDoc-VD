import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container/profile-container.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { BinModule } from "../bin/bin.module";


@NgModule({
  declarations: [
    ProfileContainerComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    BinModule
],
  exports: [
    ProfileContainerComponent,
    ProfilePageComponent
  ]
})
export class UsersModule { }
