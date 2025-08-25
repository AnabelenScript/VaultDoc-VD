// navbar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() expandedChange = new EventEmitter<boolean>();

  logoCollapsed = 'assets/logo_collapsed.svg';
  logoExpanded = 'assets/logo_expanded.svg';
  isExpanded = false;
  activeRoute = 'dashboard';
  svgCache: { [key: string]: SafeHtml } = {};

  menuItems = [
    { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: 'bx bxs-dashboard' },
    { id: 'archivos', label: 'Archivos', route: '/folders', icon: 'folder'},
    { id: 'convertir', label: 'Convertir', route: '/convertir', svg: 'assets/convert.svg' },
    { id: 'crear-doc', label: 'Crear doc', route: '/crear-doc', icon: 'fa-solid fa-file-circle-plus' },
    { id: 'anadir', label: 'Añadir', route: '/anadir', icon: 'fa-solid fa-upload' },
    { id: 'papelera', label: 'Papelera', route: '/papelera', svg: 'assets/bin.svg' }
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.detectActiveRoute();
    this.loadAllSVGs();
  }

  onMouseEnter() {
    this.isExpanded = true;
    this.expandedChange.emit(true);
  }

  onMouseLeave() {
    this.isExpanded = false;
    this.expandedChange.emit(false);
  }

  navigateTo(item: any) {
    this.activeRoute = item.id;
    this.router.navigate([item.route]);
  }

  private detectActiveRoute() {
    const currentUrl = this.router.url;
    const activeItem = this.menuItems.find(item => item.route === currentUrl);
    if (activeItem) {
      this.activeRoute = activeItem.id;
    }
  }

  private loadAllSVGs() {
    this.menuItems.forEach(item => {
      if (item.svg) {
        this.http.get(item.svg, { responseType: 'text' }).subscribe(svg => {
          this.svgCache[item.id] = this.sanitizer.bypassSecurityTrustHtml(svg);
        });
      }
    });
  }

  getSanitizedSvg(id: string): SafeHtml | null {
    return this.svgCache[id] || null;
  }
}