import { Component, OnInit, Renderer2 } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {style} from '@angular/animations';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  _trainUrl = '/assets/dataDummy.json';
  newSecond;
  items;
  saveProject;
  prilimaryArray;
  selectedItem;
  selectedData;
  selectedKeys;
  selectedValues;
  selectedRangekeys;
  selectedRangeValues;
  defaultStructure = {
    title: null,
    unit: null,
    default: 0,
    suggested: 0,
    ref: {},
    range: {
      min: 0,
      max: 0,
      ref: {}
    }
  };
  defaultData = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
  };
  primary = {
    pumping: this.defaultData ,
    prili_treat: this.defaultData ,
    pri_treat: this.defaultData ,
  };
  secondary = {
    sel_growth_type: '0',
    defData: this.defaultData,
  };
  sec_clr = this.defaultData;
  tertiary = this.defaultData;
  disinfection = this.defaultData;
  biosolid = {
    aerobic: this.defaultData,
    anaerobic: this.defaultData,
    thickener: this.defaultData
  };
  biogas = this.defaultData;
  biosolids_disposals = {
    transportation: this.defaultData,
    disposal: this.defaultData
  };
  dewatering = this.defaultData;

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.http.get( this._trainUrl)
      .subscribe(res => {
        this.items = res;
      });
      }
  selectedPumping;

  firstDrop = [{'name': 'primary'}, {'name': 'secondary'}];
  secondDrop = [{'name': 'primary', 'description': 'pumping'},
    {'name': 'primary', 'description': 'prilimary_treatment'},
    {'name': 'primary', 'description': 'primary_treatment'},
    {'name': 'secondary', 'description': 'growth_type'}];

    ngOnInit() {
      }
  firstDropChange() {
      if (this.selectedPumping) {
        this.newSecond = this.secondDrop.filter(second =>  {
          if (second.name === this.selectedPumping) {
            return second.description;
          } });
      }
    this.prilimaryArray = this.items.dewatering;
      console.log(this.prilimaryArray);
  }
  addfield()  {
    console.log('function triggered');
    const div = this.renderer.createElement('div');
    const input = this.renderer.createElement('input');
    const div2 = this.renderer.createElement('div');
    const input2 = this.renderer.createElement('input');
    const sty = this.renderer.createElement('style');
    this.renderer.appendChild(div, input);

    this.renderer.addClass(input, 'form-control');
    this.renderer.addClass(input, 'admin-addnew-text');
    this.renderer.appendChild(div2, input2);

    this.renderer.addClass(input2, 'form-control');
    this.renderer.addClass(input2, 'admin-addnew-text2');
    const textboxes = document.getElementById('textboxes');
    const textboxes2 = document.getElementById('textboxes2');
    this.renderer.appendChild(textboxes, div);
    this.renderer.appendChild(textboxes2, div2);
  }
  PopulateData() {
      console.log(this.selectedItem);
      for (const data of this.prilimaryArray) {
          if (this.selectedItem === data.title) {
            console.log(data);
            this.selectedData = data.ref;
            this.selectedKeys = Object.keys(data.ref);
            this.selectedValues = Object.values(data.ref);
            this.defaultStructure = data;
            this.selectedRangekeys = Object.keys(data.range.ref);
            this.selectedRangeValues =  Object.values(data.range.ref);
                                  }
      }
}
}
