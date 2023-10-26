import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Songs } from 'src/shared/models/Song';
import { SongService } from './song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  SONG_DATA: any;

  constructor(private songService: SongService) {  }
  ngOnInit(): void {
    this.SONG_DATA = this.songService.getSongsData();

    // this.updatePaginatorLength();

  }

  displayedColumns: string[] = ['select', 'songName', 'artistName', 'numberOfStreams', 'releaseYear', 'durationInSeconds'];
  dataSource = new MatTableDataSource<Songs>();
  selection = new SelectionModel<Songs>(true, []);
  title: any;

  // MatPaginator and MatTable view child elements
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
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

}