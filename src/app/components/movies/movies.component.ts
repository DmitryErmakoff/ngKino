import {Component, Input, } from '@angular/core';
import {IMovies} from "../../models/movie";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {ModalBoxComponent} from "../UI/modal-box/modal-box.component";
import {LocalStorageService} from "../../services/localstorage.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  constructor(public dialog: MatDialog, public localStorageService: LocalStorageService) { }

  @Input() globalMovies: IMovies[] = this.getMovies();

  @Input() movies: IMovies[] = this.globalMovies;

  @Input() style: string;


  readonly options = { day: 'numeric', month: 'long', year: 'numeric' };

  formatDate(dateMovie: string) {
    const date = new Date(dateMovie);
    let options: Intl.DateTimeFormatOptions = {
      day: "numeric", month: "long", year: "numeric",
    };
    return date.toLocaleDateString('ru-RU', options)
  }

  addStatusMovie(status: string, movies: IMovies[], movie: IMovies) {
    this.localStorageService.addStatus(status, movies, movie);
  }

  addMovie(movies: IMovies[], movie: IMovies) {
    this.localStorageService.addDataStorage(movies, movie)
  }

  deleteMovie(movies: IMovies[], movie: IMovies) {
    this.localStorageService.deleteData(movies, movie);
  }

  getMovies() {
    return this.localStorageService.getStorageData();
  }

  updateMovie(movies: IMovies[], before_movie: IMovies, after_movie: IMovies) {
    this.localStorageService.updateData(movies, before_movie, after_movie);
  }

  openDialog(movie?: IMovies): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = movie;

    const dialogRef = this.dialog.open(ModalBoxComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
        if (data && movie) {
          this.updateMovie(this.globalMovies, movie, data);
        } else if (data) {
          this.addMovie(this.globalMovies, data);
        }
    });
  }
}
