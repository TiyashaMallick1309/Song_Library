import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Songs } from 'src/shared/models/Song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  SONG_DATA: any;

  constructor() { }

  getSongsData() {
    return this.SONG_DATA;

  }
}