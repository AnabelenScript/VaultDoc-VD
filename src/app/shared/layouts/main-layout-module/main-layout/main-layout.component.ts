
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  isNavbarExpanded = false;

  onNavbarExpandedChange(expanded: boolean) {
    this.isNavbarExpanded = expanded;
  }
}