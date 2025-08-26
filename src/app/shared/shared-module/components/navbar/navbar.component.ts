import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {
  @Output() expandedChange = new EventEmitter<boolean>();
  @Input() forceExpanded = false;

  logoCollapsed = 'assets/logo_collapsed.svg';
  logoExpanded = 'assets/logo_expanded.svg';
  isExpanded = false;
  activeRoute = 'dashboard';
  svgCache: { [key: string]: SafeHtml } = {};

  menuItems = [
    { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: 'bx bxs-dashboard' },
    { id: 'convertir', label: 'Convertir', route: '/convert', svg: 'assets/convert.svg' },
    { id: 'crear-doc', label: 'Crear doc', route: '/generate', icon: 'fa-solid fa-file-circle-plus' },
    { id: 'anadir', label: 'Añadir', route: '/anadir', icon: 'fa-solid fa-upload' },
    { id: 'papelera', label: 'Papelera', route: '/papelera', svg: 'assets/bin.svg' }
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.detectActiveRoute();
    this.loadAllSVGs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['forceExpanded']) {
      if (this.forceExpanded) {
        this.isExpanded = true;
        this.expandedChange.emit(true);
      } else {
        this.isExpanded = false;
        this.expandedChange.emit(false);
      }
    }
  }

  onMouseEnter() {
    if (!this.forceExpanded) {
      this.isExpanded = true;
      this.expandedChange.emit(true);
    }
  }

  onMouseLeave() {
    if (!this.forceExpanded) {
      this.isExpanded = false;
      this.expandedChange.emit(false);
    }
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
