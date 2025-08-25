import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    LoginPageComponent,
    LoginComponent
  ]
})
export class AuthModule { }
