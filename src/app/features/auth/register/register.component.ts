import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable, of, Subject, timer } from 'rxjs';
import { map, switchMap, debounceTime, takeUntil } from 'rxjs/operators';
import { NotificationService } from '../../../core/services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ], [
      this.emailExistsValidator(this.authService)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=\S*$)(?=.*[A-Z])(?=.*\d).+$/)
    ]),
  });

  ngOnInit(): void {
    Object.keys(this.registerForm.controls).forEach(controlName => {
      const control = this.registerForm.controls[controlName as keyof typeof this.registerForm.controls];
      control.valueChanges.pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
      ).subscribe(() => {
        if (control.invalid && (control.dirty || control.touched)) {
          console.log(control)
          if (control.errors) {
            let errorMessage = '';
            if (control.errors['required']) {
              errorMessage = `${controlName} is required.`;
            } else if (control.errors['minlength']) {
              errorMessage = `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters long.`;
            } else if (control.errors['pattern']) {
              errorMessage = `${controlName} format is invalid.`;
            } else if (control.errors['email']) {
              errorMessage = `Please enter a valid email address.`;
            } else if (control.errors['emailExists']) {
              errorMessage = `This email is already registered.`;
            }
            if (errorMessage) {
              this.notificationService.showError(errorMessage);
            }
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private emailExistsValidator(authService: AuthService) {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      console.log(control)
      if (!control.value) {
        return of(null);
      }
      return timer(300).pipe(
        switchMap(() => authService.checkEmailExists(control.value)),
        map(exists => (exists ? { emailExists: true } : null))
      );
    };
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value as { username: string; email: string; password: string };
      if (username && email && password) {
        const success = await this.authService.register(username, email, password);
        if (success) {
          this.router.navigate(['/login']);
        } else {
          this.notificationService.showError('Registration failed. User with this email might already exist.');
        }
      }
    } else {
      Object.keys(this.registerForm.controls)
        .forEach(controlName => {
          const control = this.registerForm.controls[controlName as keyof typeof this.registerForm.controls];
          control.markAsTouched();
          control.updateValueAndValidity();
        });
      this.notificationService.showError('Please fill in all fields correctly.');
    }
  }
}
