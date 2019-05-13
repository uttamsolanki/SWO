import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: any = [];
  constructor(private  userService: UserService) { }

  ngOnInit() {
    const data = this.userService.getProject().subscribe((rep: any) => {
      if (rep.status === 1) {
        this.projects = rep.data;
        console.log(this.projects);
      } else {
        console.log(rep.status);
      }

    });
  }

  deleteRow(deleteId) {
    for (let i = 0 ; i < this.projects.length ; i++)  {
      if (this.projects[i]._id === deleteId) {
        this.projects = this.projects.slice(0);
        this.projects.splice(i , 1);
        break;
      }
    }
    // post call
    // this.userService.saveProject(this.projects).subscribe((rep: any) => {
    //  console.log("row deteled at server end");
    // });
  }
  duplicateRow(records) {
      console.log(records);
      console.log(new Date());
      // post call pending
  }

}
