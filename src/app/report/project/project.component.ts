import {Component, OnInit,  ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import {forEach} from '@angular/router/src/utils/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateComponent} from '../create/create.component';
import {DataServiceService} from '../../data-service.service';
import {ModalDirective} from 'ngx-bootstrap';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    createComponent: CreateComponent;
    scenarioData = [];
    id: any;
    elements = [];
    deleteID;
    projectName: '';
    @ViewChild('successModal') public modal: ModalDirective;
    @ViewChild('projectDeleteModal') public pDeleteModal: ModalDirective;
    constructor(private  userService: UserService, private router: Router, private route: ActivatedRoute, private dataServiceService: DataServiceService) { }

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        const data = this.userService.getScenario({project_id: this.id}).subscribe((response: any) => {
          this.setScenarioData(response.data.scenario);
          this.projectName = response.data.name;
        });
      }

    }
    setScenarioData(data) {
      this.scenarioData = data;
    }

    // modal dailog to ask whether you want to delete scenario
    deleteConformation(deleteId) {
      this.modal.show();
      this.deleteID = deleteId;
    }
    // delete complete row based on ID
    deleteRow() {
      const data = this.userService.deleteSenario({s_id: this.deleteID}).subscribe((response: any) => {
        for (let i = 0 ; i < this.scenarioData.length ; i++) {
          if (this.scenarioData[i]._id === this.deleteID) {
            this.scenarioData = this.scenarioData.slice(0);
            this.scenarioData.splice(i, 1);
            break;
          }
        }
      });
      this.modal.hide();
    }

    // Duplicate the create page
    duplicateRow(records) {
      this.dataServiceService.setData(records.data);
    }

    // based on which scenario is selected on the checkbox. It stores that data in the elements data.
    toggleEditable(event, scenariodId, index) {
      if (event.target.checked) {
        this.elements.splice(index, 0, scenariodId);
      } else {
        if (this.elements.indexOf(scenariodId) > -1) {
          this.elements.splice(this.elements.indexOf(scenariodId), 1);
        }
      }
    }

    // send scenario Id on click of compare button to the view page
    sendScenarioId() {
      this.dataServiceService.setSenarioId(this.elements);
    }


    projectDeleteCon(deleteId) {
      this.pDeleteModal.show();
     // this.deleteID = deleteId;
    }

    deleteProject(){
      const data = this.userService.deleteProject({p_id: this.id}).subscribe((response: any) => {
        this.pDeleteModal.hide();
        this.router.navigate(['dashboard']);
      });
    }
}
