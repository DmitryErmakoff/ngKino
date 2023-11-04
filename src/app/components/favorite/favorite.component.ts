import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/localstorage.service";
import {IMovies} from "../../models/movie";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  constructor(public localStorageService: LocalStorageService) { }

  all_movies: IMovies[] = this.localStorageService.getStorageData();

  hidden: string = 'hidden';

  moviesFavorite = this.getFavoriteMovies(this.all_movies);

  getFavoriteMovies(movies: IMovies[]) {
    return this.localStorageService.getTypeData(movies, 'favorite');
  }
}
