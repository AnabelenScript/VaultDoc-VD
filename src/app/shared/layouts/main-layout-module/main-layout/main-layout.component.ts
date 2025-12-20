import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isNavbarExpanded = true; 
  isNavbarVisible = true;
  isOverlayActive = false;
  isMobileView = false;


  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
  const threshold = 1020;
  this.isMobileView = window.innerWidth < threshold;

  if (this.isMobileView) {
    this.isNavbarVisible = false;
    this.isOverlayActive = false;
  } else {
    this.isNavbarVisible = true;
    this.isOverlayActive = false;
  }
}


  toggleNavbar() {
    this.isNavbarVisible = true;
    this.isOverlayActive = true;
  }

  closeNavbar() {
    this.isNavbarVisible = false;
    this.isOverlayActive = false;
  }

  onNavbarExpandedChange(expanded: boolean) {
    this.isNavbarExpanded = true; 
  }
}
