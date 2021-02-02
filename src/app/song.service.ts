import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment'

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

}
