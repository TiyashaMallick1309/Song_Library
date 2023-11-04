import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SongDeleteComponent } from 'src/app/song-delete/song-delete.component';
import { SongAddComponent } from 'src/app/song-add/song-add.component';

@NgModule({
  declarations: [
    SongDeleteComponent, 
    SongAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule, 
    CommonModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    BrowserModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    BrowserModule
  ]
})
export class MaterialModule { }
