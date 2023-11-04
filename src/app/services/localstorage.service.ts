import { Injectable } from '@angular/core';
import {IMovies} from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storageKey = 'movies'

  constructor() {}

  addDataStorage(movies: IMovies[], movie: IMovies): void {
    movies.push(movie);
    this.saveDataToStorage(movies);
  }

  saveDataToStorage(movies: IMovies[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
  }

  getStorageData() {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }


  deleteData(movies: IMovies[], movie: IMovies) {
    if (confirm(`Вы уверены что хотите удалить фильм: "${movie.title}" ?`)) {
      movies.splice(movies.indexOf(movie), 1);
      window.location.reload();
      this.saveDataToStorage(movies);
    }
  }

  updateData(movies: IMovies[], before_movie: IMovies, after_movie: IMovies) {
    movies[movies.indexOf(before_movie)] = after_movie;
    after_movie.favoriteStatus = before_movie.favoriteStatus;
    after_movie.watchedStatus = before_movie.watchedStatus;
    this.saveDataToStorage(movies);
  }

  addStatus(status: string, movies: IMovies[], movie: IMovies) {
    if (status == 'watched') {
      movie.watchedStatus = !movie.watchedStatus;
      console.log(movies);
    } else if (status == 'favorite') {
      movie.favoriteStatus = !movie.favoriteStatus;
      console.log(movie);
    }
    window.location.reload()
    this.saveDataToStorage(movies);
  }

  getTypeData(movies: IMovies[], typeMovies: string) {
    let moviesType: IMovies[] = []
    if (typeMovies == 'watched') {
      movies.forEach( (movie) => {
        if (movie.watchedStatus) {
          moviesType.push(movie);
        }
      })
      return moviesType;
    } else if (typeMovies == 'favorite') {
      movies.forEach( (movie) => {
        if (movie.favoriteStatus) {
          moviesType.push(movie);
        }
      })
      return moviesType;
    }
    return moviesType;
  }
}
