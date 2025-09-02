import { Component } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import {Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'VaultDoc_VD'; 
}
