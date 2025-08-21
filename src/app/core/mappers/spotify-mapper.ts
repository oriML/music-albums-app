import { Album } from '../models/album.model';
import { SpotifyAlbum, SpotifyAlbumSearchResponse, SpotifyAlbumDetailsResponse, SpotifyTrack } from '../models/spotify-models';

export function mapSpotifyAlbumToAlbum(spotifyAlbum: SpotifyAlbum | SpotifyAlbumDetailsResponse): Album {
  const album: Album = {
    id: spotifyAlbum.id,
    name: spotifyAlbum.name,
    release_date: spotifyAlbum.release_date,
    total_tracks: spotifyAlbum.total_tracks,
    images: spotifyAlbum.images.map(image => ({
      url: image.url,
      height: image.height,
      width: image.width,
    })),
    artists: spotifyAlbum.artists.map(artist => ({
      id: artist.id,
      name: artist.name,
    })),
    external_url: spotifyAlbum.external_urls.spotify,
    isFavorite: false,
  };

  if ((spotifyAlbum as SpotifyAlbumDetailsResponse).tracks) {
    album.tracks = (spotifyAlbum as SpotifyAlbumDetailsResponse).tracks.items.map((track: SpotifyTrack) => ({
      id: track.id,
      name: track.name,
      track_number: track.track_number,
      duration_ms: track.duration_ms,
    }));
  }

  return album;
}

export function mapSpotifySearchResponseToAlbums(response: SpotifyAlbumSearchResponse): Album[] {
  return response.albums.items.map(mapSpotifyAlbumToAlbum);
}
