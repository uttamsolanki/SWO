import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import {ModalDirective} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  project = {
    name: 'Project name',
    desc: 'Project Description'
  };
  sucessMessage;
  responseDataID;
  heroForm;
  constructor(private  userService: UserService) { }
  @ViewChild('successModal') public modal: ModalDirective;

  ngOnInit() {

    // For validating scenario name and description
    this.heroForm = new FormGroup({
      'name': new FormControl(this.project.name, Validators.required),
      'desc': new FormControl(this.project.desc, Validators.required)
    });
  }

  // post call
  saveProject() {
    const data = this.userService.saveNewProject(this.project).subscribe((rep: any) => {
      this.responseDataID = rep.data._id;
      this.sucessMessage = rep.message;
      this.modal.show();
    });
  }

}
