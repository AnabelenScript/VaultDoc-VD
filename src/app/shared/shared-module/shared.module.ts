import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FileOptionsComponent } from './components/file-options/file-options.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FileOptionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
],
  exports: [
    NavbarComponent,
    RouterModule,
    FileOptionsComponent,
  ]
})
export class SharedModule { }
