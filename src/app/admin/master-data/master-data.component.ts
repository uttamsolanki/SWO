import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {UserService} from '../../user.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,  private route: ActivatedRoute, private fb :FormBuilder) { }

  sizeForm: FormGroup;
  liquidForm: FormGroup;
  liquidSludgeForm: FormGroup;
  biogasForm: FormGroup;
  solidsDewateringForm: FormGroup;
  diosolidsDisposalForm: FormGroup;
  resultForm:FormGroup;

  // ****************** This for data related variable ***********************//

  size = {
    sel_size: 'Small WWTP',
    data: {default: 5000, suggested: 5000}
  };
  sel_size = 'small';

  ngOnInit() {

    this.sizeForm = this.fb.group({
        sel_size:['small'],
        small:this.fb.group({
          default: [''],
          suggested: ['']
        }),
        large:this.fb.group({
          default: [''],
          suggested: ['']
        })

    });
    this.liquidForm = this.fb.group({
        pumping: this.fb.array([
          this.addNewField(),
          this.addNewField()
        ]),
        prilimary_treatment:this.fb.array([
          this.addNewField(),
          this.addNewField()
        ]),
        primary_treatment: this.fb.array([
          this.addNewField(),
          this.addNewField()
        ]),
        secondary_clarification: this.fb.array([
          this.addNewField(),
          this.addNewField()
        ]),
        tertiary: this.fb.array([
          this.addNewField(),
          this.addNewField()
        ]),
        disinfection: this.fb.array([
          this.addNewField(),
          this.addNewField()
        ])
    });

    this.liquidSludgeForm = this.fb.group({
      aerobic_digester:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ]),
      anaerobic_digester:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ]),
      thickener:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ]),

    });

    this.biogasForm = this.fb.group({
      biogas:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ])
    });

    this.solidsDewateringForm = this.fb.group({
      dewatering:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ])
    });

    this.diosolidsDisposalForm = this.fb.group({
      transportation:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ]),
      disposal:this.fb.array([
        this.addNewField(),
        this.addNewField()
      ])
    });

    const data = this.userService.getData().subscribe((rep: any) => {
      console.log(rep);
      //this.logKeyValuePair(this.sizeForm,rep);
    });
  }

  onSubmit():void {
    const merged = {...this.liquidForm.value, biosolids:this.liquidSludgeForm.value, ...this.solidsDewateringForm.value, ...this.biogasForm.value, biosolids_disposals:this.diosolidsDisposalForm.value};
    console.log(merged);
    //console.log(this.primaryForm.value);
  }
  logKeyValuePair(group:FormGroup,res:any):void{
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractcontrol = group.get(key);
      if(abstractcontrol instanceof FormGroup){
        this.logKeyValuePair(abstractcontrol ,res);
      } if(abstractcontrol instanceof FormArray){
        console.log(res.primary.pumping);
        abstractcontrol.patchValue(res.primary.pumping);
        console.log(abstractcontrol.controls[0]);
      }else{
       console.log(key);

      }
    })
  }

  addField(){
    (<FormArray>this.liquidForm.get('pumping')).push(this.addNewField());
  }
  addNewField(): FormGroup{
    return this.fb.group({
      title: ['Uttam'],
      default: [''],
      suggested: [''],
      ref:['Ref#6'],
      range: this.fb.group({
        min:0,
        max:0,
        ref:['Ref#6**']
      })
    });
  }
  selectSize(size_types) {
    for (const s_type of size_types) {
      if (s_type.title === this.size.sel_size) {
        this.size.data = s_type;
      }
    }
  }

  selectGrowthTypeChange(event: any, growth_types: any) {
    // this.secondary.data = this.defaulValaue.data;
    // this.secondary.sel_type = this.defaulValaue.sel_type;
    // for (const type of growth_types) {
    //   if (type.title === this.secondary.sel_growth_type) {
    //     this.secondary_types = type.treatment_type;
    //   }
    // }

  }
  save() {
    // let test = [];
    // for (const field of this.fields) {
    //   this.result[field] = this[field];
    // }
    // test = this.result;
    //
    // const projectData = {projectName: this.projecName, data: test, project_id: null};
    // if (this.id) {
    //   projectData.project_id = this.id;
    // }
    //
    // console.log();
    // const data = this.userService.saveProject(projectData).subscribe((rep: any) => {
    //   this.modelMsg = rep.message;
    //   this.modal.show();
    // });
  }


}
