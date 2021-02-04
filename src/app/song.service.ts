import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class SongService {
  url: string = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getSong() {
    return this.http.get<{ id: number, albumId: number, title: string, url: string, thumbnailUrl: string}[]>(`${this.url}/photos`)
  }

  getAlbum() {
    return this.http.get<{ id: number, userId: number, title: string }[]>(`${this.url}/albums`)
  }

  songs = combineLatest([this.getSong(), this.getAlbum()]).pipe(
    map(([songs, albums]) => {
      songs.map( song => {
        song['playTime'] = '05:00';
        song['singer'] = 'AR Rahman';
        song['album'] = albums.find(album => album.id == song.albumId);
        song['isSelected'] = false;
        return song;
      })
      return songs;
    })
  )
}
