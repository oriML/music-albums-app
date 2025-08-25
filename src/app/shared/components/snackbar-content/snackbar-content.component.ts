import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './snackbar-content.component.html',
  styleUrls: ['./snackbar-content.component.scss']
})
export class SnackbarContentComponent {
  message: string;
  icon: string;
  type: 'success' | 'error' | 'info';

  constructor() {
    const data = inject(MAT_SNACK_BAR_DATA);
    this.message = data.message;
    this.icon = data.icon;
    this.type = data.type;
  }
}
