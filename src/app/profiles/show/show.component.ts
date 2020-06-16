import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  first_name: string = '';
  last_name: string = '';
  company_name: string = '';
  email: string = '';
  constructor( private userService: UserService) { }

  ngOnInit() {

    const data = this.userService.getUser().subscribe((response: any) => {

      if(response) {
        const user = response.user;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.company_name = user.company_name;
        this.email = user.email;
      }
    });
  }

}
