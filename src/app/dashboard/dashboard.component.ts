import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {DataServiceService} from '../data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects:any = [];
  numberOfProject:number;
  isLoad:boolean=false;

  constructor(private  userService: UserService, private dataServiceService: DataServiceService) { }

  ngOnInit() {
    console.log('Dashboard call');
    const data = this.userService.getProject().subscribe((rep: any) => {
      if(rep.status === 1) {
        this.numberOfProject = Object.keys(rep.data).length;
        this.projects = rep.data;
        console.log(this.projects);
        this.isLoad=true;
      } else {
        console.log(rep.status);
      }

    });
  }
  setProjectData(data) {
    this.dataServiceService.setProjectData(data);
  }
}
