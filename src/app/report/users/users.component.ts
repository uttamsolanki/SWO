import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }
  usersData:any=[];
  ngOnInit() {


      const data = this.userService.getUserList().subscribe((response: any) => {
        console.log(response);
        this.usersData=response.user;
      });

  }

}
