import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.css'],
})
export class HomeMoviesComponent implements OnInit {
  searchMovie: string;
  moviesList = [];
  movieForm: FormGroup;
  movies = [
    {
      movieTitle: 'Selmon Bhai',
      movieDescription: 'Sallu bhai ki moviee',
      id: 1,
    },
    {
      movieTitle: 'Selmon Bhai2',
      movieDescription: 'Sallu bhai ki moviee',
      id: 2,
    },
    {
      movieTitle: 'Selmon Bha3',
      movieDescription: 'Sallu bhai ki moviee',
      id: 3,
    },
  ];
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      movieTitle: '',
    });
  }
  onSubmit() {
    const { movieTitle } = this.movieForm.value;
    if (!movieTitle || /^\s*$/.test(movieTitle)) {
      this.movieForm.reset();
    } else {
      this.getMoviesList(movieTitle);
    }
  }
  getMoviesList(movieTitle) {
    let params = new HttpParams();
    params = params.append('search', `movieTitle;${movieTitle};like`);
    this.http
      .get(this.baseUrl + 'api/movies', {
        params: params,
      })
      .subscribe((response: any) => {
        this.moviesList = response.data;
        this.movieForm.reset();
      });
  }
  addTodo() {
    if (this.searchMovie.trim().length === 0) {
      return;
    }

    let params = new HttpParams();
    params = params.append('search', this.searchMovie);
    params = params.append('all', 'true');
    this.moviesList = this.movies;
  }

  selectMovie(id) {
    this.router.navigate(['/bookings'], { queryParams: { id: id } });
  }
}
