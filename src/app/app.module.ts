import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SongDeleteComponent } from './song-delete/song-delete.component';
import { SongAddComponent } from './song-add/song-add.component';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [  
    SongDeleteComponent, 
    SongAddComponent, 
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [
    SongAddComponent,
    SongDeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
