import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FileOptionsComponent } from './components/file-options/file-options.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    FileOptionsComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
],
  exports: [
    NavbarComponent,
    RouterModule,
    FileOptionsComponent,
    SearchBarComponent,
  ]
})
export class SharedModule { }
