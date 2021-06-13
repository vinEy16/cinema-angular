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
  eventForm: FormGroup;
  cinemaList = [];
  staticCinema = [
    {
      _id: {
        $oid: '60c4c0c6e5453b3048106b1c',
      },
      movieIds: [
        '60c4b56c78d7334ee8b15371',
        '60c4b5ab78d7334ee8b15372',
        '60c4b5c778d7334ee8b15373',
      ],
      cinemaTitle: 'Elante Mall',
      cinemaDescription: 'Elante Mall',
      __v: 0,
    },
    {
      _id: {
        $oid: '60c4c0d9e5453b3048106b1d',
      },
      movieIds: [
        '60c4b56c78d7334ee8b15371',
        '60c4b5ab78d7334ee8b15372',
        '60c4b5c778d7334ee8b15373',
      ],
      cinemaTitle: 'Picaadly',
      cinemaDescription: 'Picaadly',
      __v: 0,
    },
  ];
  timeSlot = [];
  timeStatic = [
    {
      _id: {
        $oid: '60c4c7f579bb9439ec4ca898',
      },
      houseFull: false,
      startAt: '11:00 AM',
      endAt: '2:00PM',
      movieId: '60c4b56c78d7334ee8b15371',
      cinemaId: '60c4c0c6e5453b3048106b1c',
      screenId: '60c4c52ae5453b3048106b1f',
      __v: 0,
    },
    {
      _id: {
        $oid: '60c4c83479bb9439ec4ca899',
      },
      houseFull: false,
      startAt: '11:00 AM',
      endAt: '2:00PM',
      movieId: '60c4b5ab78d7334ee8b15372',
      cinemaId: '60c4c0c6e5453b3048106b1c',
      screenId: '60c4c52ae5453b3048106b1f',
      __v: 0,
    },
  ];
  screens = [];
  screenStatic = [
    {
      _id: {
        $oid: '60c4c7f579bb9439ec4ca898',
      },
      houseFull: false,
      screenTitle: 'Screen1',
      movieId: '60c4b56c78d7334ee8b15371',
      cinemaId: '60c4c0c6e5453b3048106b1c',
      screenId: '60c4c52ae5453b3048106b1f',
      __v: 0,
    },
    {
      _id: {
        $oid: '60c4c83479bb9439ec4ca899',
      },
      houseFull: false,
      screenTitle: 'Screen2',
      movieId: '60c4b5ab78d7334ee8b15372',
      cinemaId: '60c4c0c6e5453b3048106b1c',
      screenId: '60c4c52ae5453b3048106b1f',
      __v: 0,
    },
  ];

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
        this.cinemaList = this.staticCinema;

        // this.http.get(this.baseUrl+`api/cinema/${res.id}`).subscribe((response:any)=>{
        //   this.cinemaList = response.data;
        // })
        return;
      }
    });
  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cinema: ['', [Validators.required]],
      screen: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  get f() {
    return this.eventForm.controls;
  }

  OnCatChange(event) {
    // this.http.get(this.baseUrl+`api/screens/${event.target.value}`).subscribe((response:any)=>{
    //   this.screens = response.data;
    // })

    this.screens = this.screenStatic;
  }

  OnScrChange(event) {
    // this.http.get(this.baseUrl+`api/showTime/${event.target.value}`).subscribe((response:any)=>{
    //   this.timeSlot = response.data;
    // })

    this.timeSlot = this.timeStatic;
  }

  submitBook() {
    this.submitted = true;

    if (this.eventForm.invalid) {
      return;
    }

    const formData = new FormData();

    formData.append('name', this.f.name.value);
    formData.append('email', this.f.email.value);
    formData.append('contact', this.f.phone.value);
    formData.append('showId', this.f.time.value);
    formData.append('screenId', this.f.screen.value);
    formData.append('cinemaId', this.f.cinema.value);
    formData.append('movieId', this.route.queryParams['_value'].id);

    // this.http.post(this.baseUrl+`api/showTime`,formData).subscribe((response:any)=>{
    // this.eventForm.reset();
    // alert('Booking Confirmed');
    // this.Router.navigate(['/'])
    // })
    alert('Booking Confirmed');
    this.Router.navigate(['/']);
  }
}
