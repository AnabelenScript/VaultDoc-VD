import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.css'
})
export class ProfileContainerComponent {
  showRecentFiles = true;
  showGenerateOptions = true;

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }

  toggleGenerateOptions() {
    this.showGenerateOptions = !this.showGenerateOptions;
  }


}
