import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import {ModalDirective} from 'ngx-bootstrap';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  project = {
    name: '',
    desc: ''
  };
  sucessMessage;
  responseDataID;
  constructor(private  userService: UserService) { }
  @ViewChild('successModal',{static: true}) public modal: ModalDirective;

  ngOnInit() {
  }

  // post call
  saveProject() {
    if (this.project.desc && this.project.name) {
      const data = this.userService.saveNewProject(this.project).subscribe((rep: any) => {
        this.responseDataID = rep.data._id;
        this.sucessMessage = rep.message;
        this.modal.show();
      });
    }
  }
}
