import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = "";

  constructor(private router: Router){  }

  onSearch(){
    console.log("Ejecutando búsqueda");
    if (this.searchTerm !== "")
      this.router.navigate(['search/' + this.searchTerm]);
  }

  onCancel(){
    this.searchTerm = "";
  }
}
