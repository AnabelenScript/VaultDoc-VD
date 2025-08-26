import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinContainerComponent } from './bin-container/bin-container.component';
import { BinPageComponent } from './views/bin-page/bin-page.component';



@NgModule({
  declarations: [
    BinContainerComponent,
    BinPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BinContainerComponent,
    BinPageComponent
  ]
})
export class BinModule { }
