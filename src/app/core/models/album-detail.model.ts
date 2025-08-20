export interface AlbumDetail {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  label: string;
  coverArtUrl: string;
  tracks: Track[];
  isFavorite: boolean;
}

export interface Track {
  title: string;
  duration: string;
}
