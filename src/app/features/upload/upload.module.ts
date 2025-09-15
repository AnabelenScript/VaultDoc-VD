import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadContainerComponent } from './upload-container/upload-container.component';
import { UploadPageComponent } from './views/upload-page/upload-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared-module/shared.module";



@NgModule({
  declarations: [
    UploadContainerComponent,
    UploadPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
],
  exports: [
    UploadContainerComponent,
    UploadPageComponent
  ]
})
export class UploadModule { }
