import { Component, computed, inject, OnInit, signal, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AlbumSearchPanelComponent } from './components/album-search-panel/album-search-panel.component';
import { CommonModule } from '@angular/common';
import { Album } from '../../core/models/album.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { AlbumsService, FilterType } from './services/albums.service';
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkScrollable, ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { AlbumDetailComponent } from '../album-details/components/album-details/album-details.component';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';
import { MarkFavoritePipe } from '../../shared/pipes/mark-favorite.pipe';

@Component({
  selector: 'app-albums-panel',
  imports: [
    CommonModule,
    AlbumSearchPanelComponent,
    AlbumCardComponent,
    MarkFavoritePipe,
    RouterOutlet,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  templateUrl: './albums-panel.component.html',
  styleUrl: './albums-panel.component.scss'
})
export class AlbumsPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  private favoritesService = inject(FavoritesService);
  public albumsService = inject(AlbumsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private scrollDispatcher = inject(ScrollDispatcher);

  albums = computed(() => this.albumsService.albums());
  loading = computed(() => this.albumsService.loading());
  hasMoreAlbums = computed(() => this.albumsService.hasMoreAlbums());
  error = computed(() => this.albumsService.error());

  isAlbumDetailRoute = signal<boolean>(false);
  private scrollSubscription: Subscription | null = null;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateAlbumDetailRouteStatus();
    });
    this.updateAlbumDetailRouteStatus();
  }

  ngAfterViewInit(): void {
    this.scrollSubscription = this.scrollDispatcher.scrolled().subscribe((event: CdkScrollable | void) => {
      if (event instanceof CdkScrollable) {
        this.onScroll(event.getElementRef().nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
  
  trackByAlbumId(index: number, album: Album): string {
    return album.id;
  }

  onScroll(element: HTMLElement): void {
    if (this.isAlbumDetailRoute()) {
      return;
    }

    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      if (!this.albumsService.loading() && this.albumsService.hasMoreAlbums()) {
        this.albumsService.loadMoreAlbums();
      }
    }
  }

  private updateAlbumDetailRouteStatus(): void {
    this.isAlbumDetailRoute.set(this.activatedRoute.snapshot.firstChild?.paramMap.has('albumId') ?? false);
  }

  triggerSearchEvent({ term, filterType }: { term: string, filterType: FilterType }): void {
    this.albumsService.search(term, filterType);
  }

  toggleFavoriteEvent(album: Album): void {
    this.favoritesService.toggleFavorite(album);
  }

}

