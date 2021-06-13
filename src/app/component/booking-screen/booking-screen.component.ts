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
            console.log(`###############`, response);
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
      contact: ['', [Validators.required]],
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
      .subscribe((response: any) => {
        this.screens = response;
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(`###########`, this.bookingForm.value);
    if (this.bookingForm.invalid) {
      return;
    }
    // const formData = new FormData();

    // formData.append('name', this.f.name.value);
    // formData.append('email', this.f.email.value);
    // formData.append('contact', this.f.phone.value);
    // formData.append('showId', this.f.time.value);
    // formData.append('screenId', this.f.screen.value);
    // formData.append('cinemaId', this.f.cinema.value);
    // formData.append('movieId', this.route.queryParams['_value'].id);

    // this.http.post(this.baseUrl+`api/showTime`,formData).subscribe((response:any)=>{
    // this.bookingForm.reset();
    // alert('Booking Confirmed');
    // this.Router.navigate(['/'])
    // })
    alert('Booking Confirmed');
    this.Router.navigate(['/']);
  }
}
