import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Songs } from 'src/shared/models/Song';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})

// A component class for the song add dialog
export class SongAddComponent implements OnInit {
  // A form group object to store the song data from the user input
  songForm: FormGroup = new FormGroup({
    songName: new FormControl('', [Validators.required]),
    artistName: new FormControl('', [Validators.required]),
    numberOfStreams: new FormControl('', [Validators.required]),
    releaseYear: new FormControl('', [Validators.required]),
    durationInSeconds: new FormControl('', [Validators.required])
  });
  dialog: any;

  // A constructor that injects the form builder and the dialog reference services
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SongAddComponent>
  ) { }

  // A lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    this.songForm = this.fb.group({
      songName: ['', Validators.required],
      artistName: ['', Validators.required],
      numberOfStreams: ['', Validators.required],
      releaseYear: ['', Validators.required],
      durationInSeconds: ['', Validators.required]
    });
  }

  // A method that submits the form data and closes the dialog with the song object
  onSubmit(): void {
    // Check if the form is invalid and return if true
    if (this.songForm.invalid) {
      return;
    }
    // Create a song object from the form values
    const song: Songs = {
      id: this.generateSongId(),
      songName: this.songForm.value.songName,
      artistName: this.songForm.value.artistName,
      numberOfStreams: this.songForm.value.numberOfStreams,
      releaseYear: this.songForm.value.releaseYear,
      durationInSeconds: this.songForm.value.durationInSeconds
    };
    // Close the dialog and pass the song object as the result
    this.dialogRef.close({ song: song });
  }

  // A method that cancels the dialog without any result
  onCancel(): void {
    this.dialogRef.close();
  }

  // A private method that generates a random song id
  private generateSongId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

}