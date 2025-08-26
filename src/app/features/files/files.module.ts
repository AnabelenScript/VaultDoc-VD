import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesPageComponent } from './views/files-page/files-page.component';
import { FoldersPageComponent } from './views/folders-page/folders-page.component';
import { FoldersContainerComponent } from './folders-container/folders-container.component';
import { FormsModule } from '@angular/forms';
import { FilesContainerComponent } from './files-container/files-container.component';



@NgModule({
  declarations: [
    FilesPageComponent,
    FoldersPageComponent,
    FoldersContainerComponent,
    FilesContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FilesPageComponent,
    FoldersPageComponent,
  ]
})
export class FilesModule { }
