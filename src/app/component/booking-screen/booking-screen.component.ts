import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-booking-screen',
  templateUrl: './booking-screen.component.html',
  styleUrls: ['./booking-screen.component.css'],
})
export class BookingScreenComponent implements OnInit {
  baseUrl = environment.baseUrl;
  submitted = false;
  bookingForm: FormGroup;
  cinemaList;
  screens: any = [];
  movie;
  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((res: any) => {
      if (Object.keys(res).length === 0) {
        this.Router.navigate(['/']);
        return;
      }
      if (res.id) {
        this.http
          .get(this.baseUrl + `api/movies/${res.id}`)
          .subscribe((response: any) => {
            this.movie = response;
          });
        let params = new HttpParams();
        params = params.append('search', `movieIds;${res.id};in`);
        this.http
          .get(this.baseUrl + 'api/cinema', {
            params: params,
          })
          .subscribe((response: any) => {
            if (response.data && (response.data || []).length) {
              this.cinemaList = response.data;
            } else {
              alert('No cinemas Found !!');
              this.Router.navigate(['/']);
            }
          });
        return;
      }
    });
  }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],
      cinema: ['', [Validators.required]],
      showId: ['', [Validators.required]],
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  OnCinemaSelect(event) {
    this.http
      .post(this.baseUrl + `api/showTime/getScreenDetails`, {
        movieId: this.movie._id,
        cinemaId: event.target.value,
      })
      .subscribe(
        (response: any) => {
          this.screens = response;
        },
      );
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
    const data = this.bookingForm.value;
    delete data.cinema;
    this.http
      .post(this.baseUrl + `api/bookings`, data)
      .subscribe((response: any) => {
        this.bookingForm.reset();
        alert('Booking Confirmed');
        this.Router.navigate(['/']);
      });
  }
}
