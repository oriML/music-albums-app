import { Injectable, signal, effect } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly currentTheme = signal<Theme>('dark');
  private readonly THEME_KEY = 'appTheme';

  constructor(private localStorageService: LocalStorageService) {
    const savedTheme = this.localStorageService.getItem<Theme>(this.THEME_KEY);
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    }

    effect(() => {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(this.currentTheme());
      this.localStorageService.setItem(this.THEME_KEY, this.currentTheme());
    });
  }

  toggleTheme(): void {
    this.currentTheme.update(current =>
      current === 'dark' ? 'light' : 'dark'
    );
  }
}
