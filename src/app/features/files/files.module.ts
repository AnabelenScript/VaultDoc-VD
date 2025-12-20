import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesPageComponent } from './views/files-page/files-page.component';
import { FoldersPageComponent } from './views/folders-page/folders-page.component';
import { FoldersContainerComponent } from './folders-container/folders-container.component';
import { FormsModule } from '@angular/forms';
import { FilesContainerComponent } from './files-container/files-container.component';
import { SharedModule } from "../../shared/shared-module/shared.module";
import { SearchPageComponent } from './views/search-page/search-page.component';
import { SearchContainerComponent } from './search-container/search-container.component';



@NgModule({
  declarations: [
    FilesPageComponent,
    FoldersPageComponent,
    FoldersContainerComponent,
    FilesContainerComponent,
    SearchPageComponent,
    SearchContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
],
  exports: [
    FilesPageComponent,
    FoldersPageComponent,
    SearchPageComponent,
  ]
})
export class FilesModule { }
