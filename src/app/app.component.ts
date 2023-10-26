import { Component } from "@angular/core";
import { SongTableComponent } from "./song-table/song-table.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[SongTableComponent]
})

export class AppComponent{

}