import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {
  
  // testing(){
  //   this.http.get<any>(`${environment.serverUrl}/testing`).subscribe(
  //     x=>{
  //       console.log(x);
  //     } 
  //   );
  // }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
