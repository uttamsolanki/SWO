import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import {ModalDirective} from 'ngx-bootstrap';

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
  responseData;
  constructor(private  userService: UserService) { }
  @ViewChild('successModal') public modal: ModalDirective;

  ngOnInit() {
  }

  // post call
  saveProject() {

    const data = this.userService.saveNewProject(this.project).subscribe((rep: any) => {
      console.log(rep);
      this.sucessMessage = rep.message;
      this.modal.show();
    });
  }

}
