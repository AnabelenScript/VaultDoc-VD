import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateContainerComponent } from './generate-container/generate-container.component';
import { GeneratePageComponent } from './views/generate-page/generate-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GenerateContainerComponent,
    GeneratePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GenerateContainerComponent,
    GeneratePageComponent
  ]
})
export class GenerateModule { }
