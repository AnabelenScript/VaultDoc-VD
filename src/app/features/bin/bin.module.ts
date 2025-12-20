import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinContainerComponent } from './bin-container/bin-container.component';
import { BinPageComponent } from './views/bin-page/bin-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BinContainerComponent,
    BinPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    BinContainerComponent,
    BinPageComponent
  ]
})
export class BinModule { }
