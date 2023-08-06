import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/localstorage.service";
import {IMovies} from "../../models/movie";

// @ts-ignore
@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss'],
})
export class WatchedComponent {
  constructor(public localStorageService: LocalStorageService) { }

  all_movies: IMovies[] = this.localStorageService.getStorageData();

  hidden: string = 'hidden';

  moviesWatched = this.getWatchedMovies(this.all_movies);

  getWatchedMovies(movies: IMovies[]) {
    return this.localStorageService.getTypeData(movies, 'watched');
  }
}
