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
  noMovieFound=false;
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
        if (response.data && (response.data || []).length) {
          this.noMovieFound = false;
          this.moviesList = response.data;
          // this.movieForm.reset();
        } else {
          this.noMovieFound = true;
        }
      });
  }
  selectMovie(id) {
    this.router.navigate(['/bookings'], { queryParams: { id: id } });
  }
}
