import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'ui-angular-api-expjs-org-application-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent 
// implements OnInit
 {
  title = 'web-ui';
  constructor(private Users:UserService){

  }
  // ngOnInit(): void {
  //     // this.Users.getUserProfile().subscribe(res=>{
  //     //   console.log(res);
  //     // })
  // }
}
