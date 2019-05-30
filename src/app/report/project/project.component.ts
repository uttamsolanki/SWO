import {Component, OnInit,  ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import {forEach} from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
import {CreateComponent} from '../create/create.component';
import {DataServiceService} from '../../data-service.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  createComponent: CreateComponent;
  projects: any = [];
  scenarioData = [];
  id:any;
  elements = [];
  constructor(private  userService: UserService, private route: ActivatedRoute, private dataServiceService: DataServiceService) { }

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const data = this.userService.getScenario({project_id: this.id}).subscribe((response: any) => {
        console.log("service working");
        this.setScenarioData(response.data.scenario);
      });
    }
  }
  setScenarioData(data) {
    this.scenarioData = data;
    console.log(this.scenarioData);
  }

  deleteRow(deleteId) {
    const data = this.userService.deleteSenario({project_id: deleteId}).subscribe((response: any) => {
    for (let i = 0 ; i < this.scenarioData.length ; i++) {
      if (this.scenarioData[i]._id === deleteId) {
        this.scenarioData = this.projects.slice(0);
        this.scenarioData.splice(i, 1);
        break;
      }
    }
    });
  }
  duplicateRow(records) {
    this.dataServiceService.setData(records.data);
  }
  toggleEditable(event, scenariodId, index) {
    if (event.target.checked) {
      this.elements.splice(index, 0, scenariodId);
    } else {
      if (this.elements.indexOf(scenariodId) > -1) {
        this.elements.splice(this.elements.indexOf(scenariodId), 1);
      }
    }
  }
  sendScenarioId() {
    this.dataServiceService.setSenarioId(this.elements);
  }
}
