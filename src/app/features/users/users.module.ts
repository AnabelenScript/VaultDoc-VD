import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container/profile-container.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { BinModule } from "../bin/bin.module";
import { PersonsContainerComponent } from './persons-container/persons-container.component';
import { PersonsPageComponent } from './views/persons-page/persons-page.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "../../app-routing.module";


@NgModule({
  declarations: [
    ProfileContainerComponent,
    ProfilePageComponent,
    PersonsContainerComponent,
    PersonsPageComponent
  ],
  imports: [
    CommonModule,
    BinModule,
    FormsModule,
    AppRoutingModule
],
  exports: [
    ProfileContainerComponent,
    ProfilePageComponent,
    PersonsPageComponent,
    PersonsContainerComponent
  ]
})
export class UsersModule { }
