import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vbiMusic';
  constructor() {
    localStorage.setItem('playlistId', '0')
    localStorage.setItem('playlists', '[]')
  }
}
