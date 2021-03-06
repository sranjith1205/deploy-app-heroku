import { Component, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../song.service';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("musicTab", { static: false }) musicTab: MatTabGroup;
  searchSongString = new BehaviorSubject('');
  playlists = JSON.parse(localStorage.getItem('playlists'));

  songs = combineLatest([this.songService.songs, this.searchSongString]).pipe(
    map(([songs, searchSongString ]) => {
      songs = songs.filter(song => song.title.substring(0, searchSongString.length) == searchSongString)
      return songs;
    })
  )

  constructor(
    private songService: SongService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // if(this.route.snapshot.fragment == 'playlist') {
    //   this.isAllSongs = false;
    // }
  }

  searchSong(string) {
    this.searchSongString.next(string);
  }

  createPlaylist() {
    this.router.navigate(['playlist/0']);
  }

  goToPlaylist(playlist) {
    this.router.navigateByUrl(`playlist/${playlist.id}`);
  }

}
