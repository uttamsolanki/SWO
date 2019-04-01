import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects:any = [];
  numberOfProject:number

  constructor(private  userService: UserService) { }

  ngOnInit() {
    console.log('Dashboard call');
    const data = this.userService.getProject().subscribe((rep: any) => {
      if(rep.status === 1) {
        this.numberOfProject = Object.keys(rep.data).length;
        this.projects = rep.data;
        console.log(this.projects.length);
      } else {
        console.log(rep.status);
      }

    });
  }

}
