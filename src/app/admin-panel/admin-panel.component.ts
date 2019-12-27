import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  primaryData;
  newSecond;
  thirdArray;
  items;
  firstItem;
  selectedItem;
  secondaryData;
  secondaryNewData;
  processData;
  selectedData;
  initialStructure = {
    _id: null,
    title: null,
    uvalue: 0,
    co2: 0,
    default: 0,
    suggested: 0,
    ref: {},
    info: null,
    range: {
      min: 0,
      max: 0,
      ref: {}
    },
    unit: null,
  };
  defaultStructure = JSON.parse(JSON.stringify(this.initialStructure))
  @ViewChild('successModal') public modal: ModalDirective;

  constructor( private  userService: UserService) {
      }
  firstDrop = [ 'Liquid Line list', 'Process'];

    ngOnInit() {
      this.userService.getPrimaryData().subscribe((response: any) => {
        this.primaryData = response.data;
      });
      this.userService.getProcessData().subscribe((response: any) => {
        this.processData = response.data;
        console.log(this.processData);
      });
      }

  save(model) {
    this.modal.show();
  }

  firstDropdownChange() {
    if ( this.firstItem === 'Process') {
      this.selectedData = this.processData;
    } else if (this.firstItem === 'Liquid Line list') {
      this.selectedData = this.primaryData;
    }
  }
  secondDropData() {
    this.defaultStructure = this.initialStructure;
    if ( this.firstItem === 'Process') {
      this.processingThirdArray(this.processData);
    } else if (this.firstItem === 'Liquid Line list') {
      this.processingThirdArray(this.primaryData);
    }
  }

  processingThirdArray(data) {
    // if (this.firstItem) {
    //   data.map(second =>  {
    //     if (second.title === this.newSecond) {
    //       this.thirdArray = second.value;
    //     } });
    // }
    for (const newvalue in data) {
      if (data[newvalue].title === this.newSecond) {
              this.thirdArray = data[newvalue].value;
            }
    }
  }
  PopulateData() {
    if (this.selectedItem) {
      {
        for (const data of this.thirdArray) {
          if (data.title === this.selectedItem) {
            if (this.newSecond === 'Secondary Treatment') {
              this.defaultStructure = this.initialStructure;
              this.secondaryNewData = data.treatment_type;
            } else {
              this.defaultStructure = data;
            }
          }
        }
      }
    }
  }
  populateSecondarydata() {
    this.defaultStructure = this.initialStructure;
      if (this.secondaryData) {
        for (const newData of this.secondaryNewData) {
          if (newData.title === this.secondaryData) {
            this.defaultStructure = newData;
          }
        }
      }
  }
  SaveData() {
    this.userService.saveAdminData(this.defaultStructure, this.defaultStructure._id).subscribe((rep: any) => {
     // console.log(rep);
    });
    this.modal.show();
  }
}
