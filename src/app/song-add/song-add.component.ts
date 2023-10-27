import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Songs } from 'src/shared/models/Song';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {
  songForm: FormGroup = new FormGroup({
    songName: new FormControl('', [Validators.required]),
    artistName: new FormControl('', [Validators.required]),
    numberOfStreams: new FormControl('', [Validators.required]),
    releaseYear: new FormControl('', [Validators.required]),
    durationInSeconds: new FormControl('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SongAddComponent>
  ) { }

  ngOnInit(): void {
    this.songForm = this.fb.group({
      songName: ['', Validators.required],
      artistName: ['', Validators.required],
      numberOfStreams: ['', Validators.required],
      releaseYear: ['', Validators.required],
      durationInSeconds: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.songForm.invalid) {
      return;
    }
    const song: Songs = {
      id: this.generateSongId(),
      songName: this.songForm.value.songName,
      artistName: this.songForm.value.artistName,
      numberOfStreams: this.songForm.value.numberOfStreams,
      releaseYear: this.songForm.value.releaseYear,
      durationInSeconds: this.songForm.value.durationInSeconds
    };
    this.dialogRef.close({ song: song });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private generateSongId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}