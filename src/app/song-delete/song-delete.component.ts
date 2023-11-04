import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Songs } from 'src/shared/models/Song';

@Component({
  selector: 'app-song-delete',
  templateUrl: './song-delete.component.html',
  styleUrls: ['./song-delete.component.css']
})
export class SongDeleteComponent {
  public selectedSongs: Songs[] = [];

  constructor(public dialogRef: MatDialogRef<SongDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: { songs: Songs[] }) { }

  ngOnInit(): void {
    this.selectedSongs = [...this.data.songs];
  }

  onCancel(): void {
    this.dialogRef.close();
  }  
}
