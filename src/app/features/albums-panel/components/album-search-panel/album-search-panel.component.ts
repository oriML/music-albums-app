import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';
import { FilterType } from '../../services/albums.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-album-search-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './album-search-panel.component.html',
  styleUrls: ['./album-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumSearchPanelComponent implements OnInit {

  triggerSearchEvent = output<{ term: string, filterType: FilterType }>();

  searchControl = new FormControl('');
  filterTypeControl = new FormControl<FilterType>('album');

  recentQueries = signal<string[]>([]);
  private localStorageService = inject(LocalStorageService);
  private readonly RECENT_QUERIES_KEY = 'recentQueries';

  ngOnInit(): void {
    this.loadRecentQueries();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => {
        const filterType = this.filterTypeControl.value || 'album';
        if (term && this.searchControl.valid) { // Only save and emit if valid
          this.saveQuery(term);
          this.triggerSearchEvent.emit({ term: term ?? '', filterType });
        }
      }),
    ).subscribe();

    this.filterTypeControl.valueChanges.pipe(
      tap(() => this.searchControl.updateValueAndValidity({ emitEvent: true }))
    ).subscribe();
  }

  private loadRecentQueries(): void {
    const queries = this.localStorageService.getItem<string[]>(this.RECENT_QUERIES_KEY);
    if (queries) {
      this.recentQueries.set(queries);
    }
  }

  private saveQuery(query: string): void {
    const currentQueries = this.recentQueries();
    const updatedQueries = [query, ...currentQueries.filter(q => q !== query)];
    this.recentQueries.set(updatedQueries.slice(0, 5));
    this.localStorageService.setItem(this.RECENT_QUERIES_KEY, this.recentQueries());
  }

  onRecentQuerySelected(query: string): void {
    this.searchControl.setValue(query);
  }

  removeQuery(queryToRemove: string): void {
    const updatedQueries = this.recentQueries().filter(query => query !== queryToRemove);
    this.recentQueries.set(updatedQueries);
    this.localStorageService.setItem(this.RECENT_QUERIES_KEY, this.recentQueries());
  }
}