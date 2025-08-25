import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarContentComponent } from '../../shared/components/snackbar-content/snackbar-content.component';

export type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  constructor() { }

  showNotification(message: string, type: NotificationType = 'info', icon?: string, duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: [`${type}-snackbar`],
      horizontalPosition: 'end', // Position to the right
      verticalPosition: 'top', // Position to the top
      data: { message, icon, type } // Pass data to the custom component
    };

    this.snackBar.openFromComponent(SnackbarContentComponent, config);
  }

  showSuccess(message: string, icon: string = 'check_circle', duration: number = 3000): void {
    this.showNotification(message, 'success', icon, duration);
  }

  showError(message: string, icon: string = 'error', duration: number = 3000): void {
    this.showNotification(message, 'error', icon, duration);
  }

  showInfo(message: string, icon: string = 'info', duration: number = 3000): void {
    this.showNotification(message, 'info', icon, duration);
  }
}
