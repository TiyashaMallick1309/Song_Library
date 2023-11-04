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
  SONG_DATA: Songs[] = [];

  constructor(private songService: SongService, private dialog: MatDialog) {  }
  ngOnInit(): void {
    this.SONG_DATA = this.songService.getSongsData();
    this.dataSource.data = this.SONG_DATA;
  }

  displayedColumns: string[] = ['select', 'songName', 'artistName', 'numberOfStreams', 'releaseYear', 'durationInSeconds'];
  dataSource = new MatTableDataSource<Songs>();
  selection = new SelectionModel<Songs>(true, []);
  
  // MatPaginator and MatTable view child elements
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
    this.dataSource.paginator.pageSize = 10; // or any other page size you prefer
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    // Set up sorting behavior
    this.dataSource.sort = this.sort;
  }
  
  // Whether the number of selected elements matches the total number of rows.
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Songs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const inputPlaceholder = (event.target as HTMLInputElement).placeholder.toLowerCase();
    if (inputPlaceholder === 'type song name') {
      this.dataSource.filterPredicate = (data: Songs, filter: string) => data.songName.toLowerCase().includes(filter);
    } else if (inputPlaceholder === 'type artist name') {
      this.dataSource.filterPredicate = (data: Songs, filter: string) => data.artistName.toLowerCase().includes(filter);
    }
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFormattedDuration(durationInSeconds: number): string {
    const mins = Math.floor(durationInSeconds / 60);
    const secs = Math.floor(durationInSeconds % 60);
    return `${mins}:${secs < 10 ? `0${secs}`: secs}`;
  }

  toggleSelection(row: Songs): void {
    if (this.selection.selected.length < 5 || this.selection.isSelected(row)) {
      this.selection.toggle(row);
    } else {
      alert('You can select only up to 5 songs.');
    }
  }

  openAddSongDialog(): void {
    const dialogRef = this.dialog.open(SongAddComponent, {
      width: '800px',
      height: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.song) {
        this.SONG_DATA.push(result.song);
        this.dataSource.data = this.SONG_DATA;
      }
    });
  }

  openDeleteSongDialog(): void {
    const dialogRef = this.dialog.open(SongDeleteComponent, {
      width: '500px',
      height: '500px',
      data: { songs: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deletedSongsCount = this.selection.selected.length;
        this.selection.selected.forEach(song => {
          const index = this.SONG_DATA.findIndex(s => s.id === song.id);
          if (index !== -1) {
            this.SONG_DATA.splice(index, 1);
          }
        });
        this.selection.clear();
        this.dataSource.data = this.SONG_DATA;
        alert(`${deletedSongsCount} song(s) have been deleted successfully.`);
      }
    });
  }
}