import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import {BaseChartDirective} from 'ng2-charts';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  constructor(private userService: UserService, private router: Router,  private route: ActivatedRoute) { }

  @ViewChild('tabset') tabset: TabsetComponent;
  @ViewChild('baseChart') public chart: BaseChartDirective;
  @ViewChild('successModal') public modal: ModalDirective;

  fields: any = ['primary', 'secondary', 'sec_clr', 'tertiary', 'disinfection', 'biosolid', 'biogas', 'biosolids_disposals', 'dewatering'];

  modelMsg;
  co2_eq = 135.5;
  projecName = 'Project-1';

  // ****************** This for data related variable ***********************//

  size = {
    sel_size: 'Small WWTP',
    data: {default: 5000, suggested: 5000}
  };
  primary = {
    pumping: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    },
    prili_treat: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    },
    pri_treat: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    }
  };
  secondary = {
    sel_growth_type: '0',
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null},
  };
  sec_clr = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null},
  };
  tertiary = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null},
  };
  disinfection = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null}
  };
  biosolid = {
    aerobic: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    },
    anaerobic: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    },
    thickener: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    }
  };
  biogas = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null},
  };
  biosolids_disposals = {
    transportation: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    },
    disposal: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null},
    }
  };
  dewatering = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null},
  };

  defaulValaue = {
    sel_type: '0',
    data: {title: '0', default: 0, co2: 0, suggested: 0},
  };
  // ****************** This for data related variable ***********************//
  information = {
    primary: {
      pumping: {
        ref: [],
        range: {
          min: 0,
          max: 1,
          ref: []
        },
      },
      prili_treat: {
        sel_type: '0',
        data: {title: null, default: null, co2: null, suggested: null},
      },
      pri_treat: {
        sel_type: '0',
        data: {title: null, default: null, co2: null, suggested: null},
      }
    }
  };
  size_types: any;
  pumping_types: any;
  prili_treat_types: any;
  pri_treat_types: any;
  growth_types: any;
  secondary_types: any;
  sec_clr_types: any;
  tertiary_types: any;
  disinfection_types: any;
  anaerobic_digester: any;
  aerobic_digester: any;
  thickener_types: any;
  dewatering_types: any;
  biogas_type: any;
  transportation_type: any;
  disposal_type: any;
  isCollapsed = false;
  isChart = false;
  iconCollapse = 'icon-arrow-up';
  totalElecricalCo2 = 0;
  totalBiolidDisposalCo2 = 0;
  result: any = {};
  id: string;
  // *************  barChart Start *************//

  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(102,178,255,.3)',
      borderWidth: 0
    }
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: 'rgba(148,159,177,0.2)',
    scales: {
      xAxes: [{
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        barThickness: 30,
        ticks: {
          autoSkip: false
        }
      }]
    }
  };

  public barChartLabels: string[] = ['206', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 21], label: 'CO2 Equalvalent from Electricity Emissions'}
  ];

  ngOnInit() {

    const data = this.userService.getData().subscribe((resp: any) => {
      Object.assign(this.primary.pumping, this.defaulValaue.data);
      this.assignFormValue(resp);
    });

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id !== null) {
      const details = this.userService.getProjectDatils({project_id: this.id}).subscribe((resp: any) => {
        if (resp.status == 1) {
          this.assignEditFormValue(resp.data);
        }
      });
    }

  }
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  assignFormValue(data) {
    this.sizeData(data.size);
    this.primaryData(data.primary);
    this.secondaryData(data.secondary);
    this.secondaryClarification(data.secondary_clarification);
    this.tertiaryData(data.tertiary);
    this.disinfectionData(data.disinfection);
    this.biosolidsData(data.biosolids);
    this.biogasData(data.biogas);
    this.dewateringData(data.dewatering);
    this.biosolids_disposalData(data.biosolids_disposals);
  }
  assignEditFormValue(editData) {
    if (editData.scenario) {
      this.projecName = editData.name;
      const fielddData = editData.scenario[0].data;
      for (const field of this.fields) {
        this[field] = fielddData[field];
        console.log(fielddData[field]);
      }
      this.updateWWTPsize();
    }


  }

  sizeData(size) {
    this.size_types = size;
  }
  selectSize(size_types) {
    for (const s_type of size_types) {
      if (s_type.title === this.size.sel_size) {
        this.size.data = s_type;
      }
    }
    this.updateWWTPsize();
  }

  primaryData(primary) {
    this.pumping_types = primary.pumping;
    this.prili_treat_types = primary.prilimary_treatment;
    this.pri_treat_types = primary.primary_treatment;
  }
  secondaryData(secondary) {
    this.growth_types = secondary.growth_type;
  }
  secondaryClarification(secondary_data) {
    this.sec_clr_types = secondary_data;
  }
  selectGrowthTypeChange(event: any, growth_types: any) {
    this.secondary.data = this.defaulValaue.data;
    this.secondary.sel_type = this.defaulValaue.sel_type;
    for (const type of growth_types) {
      if (type.title === this.secondary.sel_growth_type) {
        this.secondary_types = type.treatment_type;
      }
    }
    this.updateWWTPsize();
  }

  tertiaryData(tertiary) {
    this.tertiary_types = tertiary;
  }

  disinfectionData(disinfection) {
    this.disinfection_types = disinfection;
  }


  biosolidsData(biosolids) {
    this.anaerobic_digester = biosolids.anaerobic_digester;
    this.aerobic_digester = biosolids.aerobic_digester;
    this.thickener_types = biosolids.thickener;
  }


  biogasData(biogas) {
    this.biogas_type = biogas;
  }

  dewateringData(dewatering) {
    this.dewatering_types = dewatering;
  }

  biosolids_disposalData(biosolids_disposal) {
    this.transportation_type =  biosolids_disposal.transportation;
    this.disposal_type =  biosolids_disposal.disposal;
  }

  updateWWTPsize() {
    //console.log(this.size.sel_size);
    // if(this.size.data.default >= 50000 ){
    //   for (const s_type of this.size_types) {
    //     if (s_type.title !== this.size.sel_size) {
    //       this.size.data = s_type;
    //       break;
    //     }
    //   }
    // }
    this.co2Calcaltion(this.primary.pumping.data);
    this.co2Calcaltion(this.primary.pri_treat.data);
    this.co2Calcaltion(this.primary.prili_treat.data);
    this.co2Calcaltion(this.secondary.data);
    this.co2Calcaltion(this.sec_clr.data);
    this.co2Calcaltion(this.tertiary.data);
    this.co2Calcaltion(this.disinfection.data);
    this.co2Calcaltion(this.biosolid.aerobic.data);
    this.co2Calcaltion(this.biosolid.thickener.data);
    this.co2Calcaltion(this.biosolid.anaerobic.data);
    this.co2Calcaltion(this.biogas.data);
    this.co2Calcaltion(this.dewatering.data);
    this.co2Calcaltion(this.biosolids_disposals.disposal.data);
    this.co2Calcaltion(this.biosolids_disposals.transportation.data);
    this.createChart();
  }

  // this.barChartLabels = [this.primary.pumping.title, this.primary.prili_treat.data.title, this.primary.prili_treat.data.title,
  //   this.secondary.data.title, this.secondary.sec_clr.title, this.tertiary.data.title, this.disinfection.data.title,
  //   this.biosolid.digester.data.title, this.biosolid.thickener.data.title, this.biosolid.dewatering.data.title];

  createChart() {
    this.isChart = true;
    this.barChartLabels = [];
    this.totalElecricalCo2 = 0;
    this.totalBiolidDisposalCo2 = 0;
    const newData = [];
     if (this.primary.pumping.sel_type !== '0') {
         this.barChartLabels.push(this.primary.pumping.data.title);
         newData.push(this.primary.pumping.data.co2);
         this.totalElecricalCo2 += JSON.parse(this.primary.pumping.data.co2);
     }
    if (this.primary.pri_treat.sel_type !== '0') {
      this.barChartLabels.push(this.primary.pri_treat.data.title);
      newData.push(this.primary.pri_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.pri_treat.data.co2);
    }
    if (this.primary.prili_treat.sel_type !== '0') {
      this.barChartLabels.push(this.primary.prili_treat.data.title);
      newData.push(this.primary.prili_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.prili_treat.data.co2);
    }
    if (this.secondary.sel_type !== '0') {
      this.barChartLabels.push(this.secondary.data.title);
      newData.push(this.secondary.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.secondary.data.co2);
    }
    if (this.sec_clr.sel_type !== '0') {
      this.barChartLabels.push(this.sec_clr.data.title);
      newData.push(this.sec_clr.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.sec_clr.data.co2);
    }
    if (this.tertiary.sel_type !== '0') {
      this.barChartLabels.push(this.tertiary.data.title);
      newData.push(this.tertiary.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.tertiary.data.co2);
    }
    if (this.disinfection.sel_type !== '0') {
      this.barChartLabels.push(this.disinfection.data.title);
      newData.push(this.disinfection.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.disinfection.data.co2);
    }
    if (this.biosolid.aerobic.sel_type !== '0') {
      this.barChartLabels.push(this.biosolid.aerobic.data.title);
      newData.push(this.biosolid.aerobic.data.co2);
     // this.totalElecricalCo2 += JSON.parse(this.biosolid.aerobic.data.co2);
    }
    if (this.biosolid.thickener.sel_type !== '0') {
      this.barChartLabels.push(this.biosolid.thickener.data.title);
      newData.push(this.biosolid.thickener.data.co2);
      // this.totalElecricalCo2 += JSON.parse(this.biosolid.thickener.data.co2);
    }
    if (this.biosolid.anaerobic.sel_type !== '0') {
      this.barChartLabels.push(this.biosolid.anaerobic.data.title);
      newData.push(this.biosolid.anaerobic.data.co2);
     // this.totalElecricalCo2 += JSON.parse(this.biosolid.anaerobic.data.co2);
    }
    if (this.dewatering.sel_type !== '0') {
      this.barChartLabels.push(this.dewatering.data.title);
      newData.push(this.dewatering.data.co2);
     // this.totalElecricalCo2 += JSON.parse(this.dewatering.data.co2);
    }

    this.barChartData = [
      {data: newData, label: 'CO2 Equalvalent from Electricity Emissions'}
    ];
    this.chart.datasets = this.barChartData;
    this.chart.labels = this.barChartLabels;
    this.chart.ngOnInit();

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // *************  barChart End *************//

  // *************  Common Function  Start *************//

  /**
   * Select treatment type from the dropdown
   * @param cat  eg... primary, secondary etc.
   * @param type  eg... prilimary , digester etc.
   * @param treatment_types
   */
  selectTreatmentType(cat, type, treatment_types) {
    if (!cat) {
      for (const tr_type of treatment_types) {
        if (this[type].sel_type === '0') {
          this[type].data = this.co2Calcaltion(this.defaulValaue.data);
        }
        if (tr_type.title === this[type].sel_type) {
          this[type].data = this.co2Calcaltion(tr_type);
        }
      }
    } else {
      for (const tr_type of treatment_types) {
        if (this[cat][type].sel_type === '0') {
          this[cat][type].data = this.co2Calcaltion(this.defaulValaue.data);
        }
        if (tr_type.title === this[cat][type].sel_type) {
          this.information[cat][type].ref = tr_type.ref;
          for (let key in this.information[cat][type].ref) {
            console.log(this.information[cat][type].ref[key]);
          }

          this[cat][type].data = this.co2Calcaltion(tr_type);
        }
      }
    }

    this.createChart();
  }

  /**
   * Calculate Co2 value
   * @param data (Object)
   */
  co2Calcaltion(data) {
    const calculation = (data.default * this.co2_eq * this.size.data.default ) / 1000;
    data.co2 = calculation.toFixed(4);
    return data;
  }

  // *************  Common Function  End *************//

  generatePdf() {
    const div = document.getElementById('printSection');
    const options = {};


    html2canvas(div, {allowTaint: true}).then(function(canvas) {



      const HTML_Width = canvas.width;
      const HTML_Height = canvas.height;
      const top_left_margin = 20;
      const PDF_Width = HTML_Width + (top_left_margin * 2);
      const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      const canvas_image_width = HTML_Width;
      const canvas_image_height = HTML_Height;

      const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF({orientation: 'p', unit: 'pt', format: [PDF_Width, PDF_Height]});

      let incanvas = document.createElement('canvas'),
        ctx = incanvas.getContext('2d'),
        parts = [],
        hy = 0,
        img = new Image();
      img.onload = split_4;
      function split_4() {
        const w2 = img.width,
          h2 = PDF_Height;
        hy = 0;
        for (let i = 0; i <= totalPDFPages; i++) {
          incanvas.width = w2;
          // incanvas.height = PDF_Height;
          incanvas.height = PDF_Height  - 100;
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, hy, img.width, PDF_Height, 0, 0, incanvas.width, incanvas.height);
          hy = hy + PDF_Height;
          parts.push( incanvas.toDataURL('image/jpeg', 1.0) );
          pdf.addImage(parts[i], 'JPG', top_left_margin, top_left_margin, incanvas.width, incanvas.height - top_left_margin);
          if (i != totalPDFPages) {
            pdf.addPage([PDF_Width, PDF_Height]);
          }
          const slicedImage = document.createElement('img');
          slicedImage.src = parts[i];
          //  document.body.appendChild(slicedImage)
          if ( i == totalPDFPages) {
            // console.log("op", imgData)
          }
        }

      }
      img.src = imgData;

      setTimeout((n) => {
        pdf.save('Report.pdf');
        // var blob = pdf.output("blob");
        //  window.open(URL.createObjectURL(blob), "_parent");
      }, 100);

      //  pdf.save("careReport.pdf");

    });
  }

  save() {
    let test = [];
    for (const field of this.fields) {
      this.result[field] = this[field];
    }
    test = this.result;

    const projectData = {projectName: this.projecName, data: test, project_id: null};
    if (this.id) {
      projectData.project_id = this.id;
    }

    console.log();
    const data = this.userService.saveProject(projectData).subscribe((rep: any) => {
      this.modelMsg = rep.message;
      this.modal.show();
    });
  }
  successOk() {
    this.modal.hide();
     this.router.navigateByUrl('/report/view');
  }

}
