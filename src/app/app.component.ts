import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Songs } from 'src/shared/models/Song';
import { SongService } from '../shared/services/song.service';
import { MatDialog } from '@angular/material/dialog';
import { SongAddComponent } from './song-add/song-add.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  // An array of song objects to store the song data
  SONG_DATA: Songs[] = [];

  // A constructor that injects the song service and the dialog service
  constructor(private songService: SongService, private dialog: MatDialog) {  }

  // A lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    // Get the song data from the song service and assign it to the data source
    this.SONG_DATA = this.songService.getSongsData();
    this.dataSource.data = this.SONG_DATA;
  }

  // An array of column names to display in the table
  displayedColumns: string[] = ['select', 'songName', 'artistName', 'numberOfStreams', 'releaseYear', 'durationInSeconds'];
  // A data source object to provide the data for the table
  dataSource = new MatTableDataSource<Songs>();
  // A selection model object to track the selection state of the table rows
  selection = new SelectionModel<Songs>(true, []);
  
  // MatPaginator and MatTable view child elements
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
    // Set the paginator for the data source and the default page size
    this.dataSource.paginator.pageSize = 10;
  }

  @ViewChild(MatSort)
  // A sort object to provide the sorting behavior for the table
  sort: MatSort = new MatSort;

  // A lifecycle hook that runs after the component’s view is initialized
  ngAfterViewInit() {
    // Set up sorting behavior for the data source
    this.dataSource.sort = this.sort;
  }
  
// A method that checks whether the number of selected elements matches the total number of rows
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // A method that toggles the selection state of all rows
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      // Clear the selection if all rows are selected
      this.selection.clear();
      return;
    }
    // Select all rows otherwise
    this.selection.select(...this.dataSource.data);
  }

  // A method that returns a label for the checkbox of a row
  checkboxLabel(row?: Songs): string {
    if (!row) {
      // Return a label for the header checkbox
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // Return a label for the row checkbox
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  // A method that applies a filter to the data source based on the input value and placeholder
  applyFilter(event: Event): void {
    // Get the input value and placeholder from the event target
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const inputPlaceholder = (event.target as HTMLInputElement).placeholder.toLowerCase();
    // Check the input placeholder to determine which column to filter by
    if (inputPlaceholder === 'type song name') {
      // Filter by song name, using a case-insensitive string comparison
      this.dataSource.filterPredicate = (data: Songs, filter: string) => data.songName.toLowerCase().includes(filter);
    } else if (inputPlaceholder === 'type artist name') {
       // Filter by artist name, using a case-insensitive string comparison
      this.dataSource.filterPredicate = (data: Songs, filter: string) => data.artistName.toLowerCase().includes(filter);
    }
    // Apply the filter to the data source
    this.dataSource.filter = filterValue;
    // If the paginator exists, go to the first page of the filtered data
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // A method that returns a formatted string for the duration of a song in minutes and seconds
  getFormattedDuration(durationInSeconds: number): string {
    // Calculate the minutes and seconds from the duration in seconds
    const mins = Math.floor(durationInSeconds / 60);
    const secs = Math.floor(durationInSeconds % 60);
    // Return a string in the format of mm:ss, padding the seconds with a zero if needed
    return `${mins}:${secs < 10 ? `0${secs}`: secs}`;
  }

  // A method that toggles the selection state of a row
  toggleSelection(row: Songs): void {
    // Check if the selection limit is reached and the row is not already selected
    if (this.selection.selected.length < 5 || this.selection.isSelected(row)) {
      // Toggle the selection of the row
      this.selection.toggle(row);
    } else {
      // Alert the user that they can only select up to 5 songs
      alert('You can select only up to 5 songs.');
    }
  }

  // A method that opens a dialog for adding a new song
  openAddSongDialog(): void {
    // Create a dialog reference with the song add component and the dialog dimensions
    const dialogRef = this.dialog.open(SongAddComponent, {
      width: '800px',
      height: '400px'
    });
  
    // Subscribe to the dialog close event and get the result
    dialogRef.afterClosed().subscribe(result => {
      // Check if the result has a song object
      if(result && result.song) {
        // Push the new song to the song data array
        this.SONG_DATA.push(result.song);
        // Update the data source with the new song data array
        this.dataSource.data = this.SONG_DATA;
      }
    });
  }

  // A method that opens a dialog for deleting a selected song
  openDeleteSongDialog(): void {
    // Create a dialog reference with the song delete component, the dialog dimensions, and the selected songs data
    const dialogRef = this.dialog.open(SongDeleteComponent, {
      width: '500px',
      height: '500px',
      data: { songs: this.selection.selected }
    });

    // Subscribe to the dialog close event and get the result
    dialogRef.afterClosed().subscribe(result => {
      // Check if the result is true
      if (result) {
        // Get the number of deleted songs
        const deletedSongsCount = this.selection.selected.length;
        // Loop through the selected songs and remove them from the song data array
        this.selection.selected.forEach(song => {
          const index = this.SONG_DATA.findIndex(s => s.id === song.id);
          if (index !== -1) {
            this.SONG_DATA.splice(index, 1);
          }
        });
        // Clear the selection
        this.selection.clear();
        // Update the data source with the new song data array
        this.dataSource.data = this.SONG_DATA;
        // Alert the user that the songs have been deleted successfully
        alert(`${deletedSongsCount} song(s) have been deleted successfully.`);
      }
    });
  }
}