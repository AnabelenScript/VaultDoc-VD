import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [
    LoginPageComponent,
    LoginComponent
  ]
})
export class AuthModule { }
