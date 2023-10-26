import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';
import { SongFormComponent } from './song-form/song-form.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from './app.component';
import { SongTableComponent } from './song-table/song-table.component';

@NgModule({
  declarations: [  
    HeaderComponent, 
    SongDeleteComponent, 
    SongFormComponent, 
    FooterComponent,
    SongTableComponent,
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
