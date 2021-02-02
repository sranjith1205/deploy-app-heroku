import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAllSongs = false;
  searchSongString = new BehaviorSubject('');

  songs = combineLatest([this.songService.getSong(), this.songService.getAlbum(), this.searchSongString]).pipe(
    map(([songs, albums, searchSongString ]) => {
      songs = songs.filter(song => song.title.substring(0, searchSongString.length) == searchSongString)

      songs.map( song => {
        song['playTime'] = '05:00';
        song['singer'] = 'AR Rahman';
        song['album'] = albums.find(album => album.id == song.albumId);
        return song;
      })
      console.log(searchSongString, songs)

      return songs;
    })

  )

  constructor(
    private songService: SongService
  ) { }

  ngOnInit(): void {
  }

  searchSong(string) {
    this.searchSongString.next(string);
  }

}
