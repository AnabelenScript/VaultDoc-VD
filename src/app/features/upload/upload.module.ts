import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadContainerComponent } from './upload-container/upload-container.component';
import { UploadPageComponent } from './views/upload-page/upload-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UploadContainerComponent,
    UploadPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UploadContainerComponent,
    UploadPageComponent
  ]
})
export class UploadModule { }
