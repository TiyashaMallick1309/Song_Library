import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';
import { SongFormComponent } from './song-form/song-form.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [  
    HeaderComponent, 
    SongDeleteComponent, 
    SongFormComponent, 
    FooterComponent,
  ],
  imports: [
    MaterialModule
  ],
  providers: [],
  exports:[HeaderComponent, 
    SongDeleteComponent, 
    SongFormComponent, 
    FooterComponent,]
  // bootstrap: [AppComponent]
})
export class AppModule { }
