import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Songs } from 'src/shared/models/Song';
import { SongService } from './song.service';
import { MatDialog } from '@angular/material/dialog';
import { SongAddComponent } from './song-add/song-add.component';

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

  @ViewChild(MatTable) table!: MatTable<Songs>;

  // MatSort view child element
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

  // Selects all rows if they are not all selected; otherwise clear selection.
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  //The label for the checkbox on the passed row
  checkboxLabel(row?: Songs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

  getFormattedDuration(durationInSeconds: number): string {
    const mins = Math.floor(durationInSeconds / 60);
    const secs = Math.floor(durationInSeconds % 60);
    return `${mins}:${secs < 10 ? `0${secs}`: secs}`;
  }

  // Method to open the Add Song dialog
  openAddSongDialog(): void {
    const dialogRef = this.dialog.open(SongAddComponent, {
      width: '500px',
      height: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.song) {
        this.SONG_DATA.push(result.song);
        this.dataSource.data = this.SONG_DATA;
      }
    });
  }
}