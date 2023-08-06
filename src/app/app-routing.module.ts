import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviesComponent} from "./components/movies/movies.component";
import {FavoriteComponent} from "./components/favorite/favorite.component";
import {WatchedComponent} from "./components/watched/watched.component";

const routes: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'watched', component: WatchedComponent},

  {path: '**', redirectTo: "", component: MoviesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
