export interface Album {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  images: { url: string; height: number; width: number }[];
  artists: { id: string; name: string }[];
  external_url: string;
  isFavorite: boolean;
  tracks?: {
    id: string;
    name: string;
    track_number: number;
    duration_ms: number;
  }[];
}
