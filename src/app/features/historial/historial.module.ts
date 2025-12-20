import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialContainerComponent } from './historial-container/historial-container.component';
import { HistorialPageComponent } from './views/historial-page/historial-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HistorialContainerComponent,
    HistorialPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    HistorialContainerComponent,
    HistorialPageComponent
  ]
})
export class HistorialModule { }
