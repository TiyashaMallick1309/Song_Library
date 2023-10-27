import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongAddComponent } from './song-add/song-add.component';
import { SongDeleteComponent } from './song-delete/song-delete.component';

const routes: Routes = [
  {
    path:'song-add',
    component: SongAddComponent
  },
  {
    path:'song-delete',
    component: SongDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
