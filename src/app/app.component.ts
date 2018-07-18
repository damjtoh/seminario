import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  constructor(private http: HttpClient) {}

  // getDosis() {
  //   return this.http.get(``);
  // }

  ngOnInit() {
    // timer(1000)
    // .pipe(
    //   flatMap(() => this.getDosis())
    // )
  }
}
