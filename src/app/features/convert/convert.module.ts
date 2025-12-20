import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertContainerComponent } from './convert-container/convert-container.component';
import { ConvertPageComponent } from './views/convert-page/convert-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConvertContainerComponent,
    ConvertPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ConvertContainerComponent,
    ConvertPageComponent
  ]
})
export class ConvertModule { }
