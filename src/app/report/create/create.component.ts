import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import {BaseChartDirective} from 'ng2-charts';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-piechart-outlabels';
import {DataServiceService} from '../../data-service.service';
//import {forEach} from '@angular/router/src/utils/collection';
import {CanComponentDeactivate} from '../../confirmGaurd/confirmation.guard';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit, CanComponentDeactivate{
  constructor(private userService: UserService, private router: Router,  private route: ActivatedRoute, private dataServiceService: DataServiceService) { }

  @ViewChild('tabset',{static: true}) tabset: TabsetComponent;
  @ViewChild('baseChart',{static: true}) public chart: BaseChartDirective;
  @ViewChild('piChart',{static: true}) public piChart: BaseChartDirective;
  @ViewChild('successModal',{static: true}) public modal: ModalDirective;
  liquidClass = 'liquid-custom-class';
  liquidSludeClass="liquid-slude-custom-heading";
  biogasClass="biogas-custom-heading";
  dewateringClass="dewatering-custom-heading";
  disposalClass="disposal-custom-heading";
  chemicalClass="chemical-custom-heading";
  fields: any = ['primary', 'secondary', 'sec_clr', 'tertiary', 'disinfection', 'biosolid', 'biogas', 'biosolids_disposals', 'dewatering', 'chemical', 'process','constant', 'size'];
  setScenarioData;
  modelMsg;
  modelTitle;
  co2_eq = 40.0;
  COD_TOC = 3.33;
  COD_TOC_PER_MOL = 32;
  Removed_TKN = 0.34;
  gamma = 0.14;
  delta = 8.422;
  scenarioName = 'Scenario';
  scenarioDesc = 'Scenario Description';
  scenarioDate = new Date();
  scenarioLength;
  scenarioLengthTemp;
  setProjectData = 'Project 1';
  setProjectDescription ='Project Description 1';
  scenarioNewName;
  primarNewData;
  // ****************** This for data related variable ***********************//

  defaultStructure = {
    title: null,
    unit: null,
    default: 0,
    suggested: 0,
    ref: null,
    range: {
        min: 0,
        max: 0,
        ref: null
    },
    info:null
  };
  size = {
    sel_size: 'Small WWTP',
    data: {default: 5000, suggested: 5000}
  };
  primary = {
    pumping: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    },
    prili_treat: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    },
    pri_treat: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    }
  };
  secondary = {
    sel_growth_type: '0',
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
  };
  sec_clr = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null,  uvalue: null},
  };
  tertiary = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null,  uvalue: null},
  };
  disinfection = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null,  uvalue: null}
  };
  biosolid = {
    aerobic: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    },
    anaerobic: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    },
    thickener: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    }
  };
  biogas = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null},
  };
  biosolids_disposals = {
    transportation: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    },
    disposal: {
      sel_type: 'Landfill without Methane Recovery',
      data: {title: null, default: null, co2: null, suggested: null, uvalue: null},
    }
  };
  dewatering = {
    sel_type: '0',
    data: {title: null, default: null, co2: null, suggested: null,  uvalue: null},
  };
  chemical = {
    metal_salts: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null , co2_eq: 0},
    },
    chlorination: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, co2_eq: 0},
    },
    dechlorination: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, co2_eq: 0},
    },
    chlorine: {
      sel_type: '0',
      data: {title: null, default: null, co2: null, suggested: null, co2_eq: 0},
    }
  };
  defaulValaue = {
    sel_type: '0',
    data: {title: '0', default: 0, co2: 0, suggested: 0, uvalue: null},
  };

   process = {
    active_sludge: {
      co2: 0,
      no2: 0,
      totalCo2: 0,
      CODin: this.defaultStructure,
      TKNin: this.defaultStructure,
      CODout: this.defaultStructure,
      TKNout: this.defaultStructure,
      FLOWwas: this.defaultStructure,
      CODwas: this.defaultStructure,
      TKNwas: this.defaultStructure,
      COD_BOD5: this.defaultStructure,
      WAS_COD_VSS: this.defaultStructure,
      COD_BOD5out: this.defaultStructure
    },
    aerobic: {
      plantinfluent: null,
      co2: 0,
      ch4: 0,
      totalCo2: 0,
      Qin: 0,
      FLOWin: this.defaultStructure,
      CODin: this.defaultStructure,
      CODout: this.defaultStructure,
      CODred: this.defaultStructure
    },
    anarobic: {
      plantinfluent: '1',
      isOrganic: 1,
      isBiosolids: 1,
      isFlaring: 1,
      isExternal: 0,
      co2: 0,
      ch4: 0,
      Qin: 0,
      totalCo2: 0,
      addEnergy:0,
      FLOWin: this.defaultStructure,
      CODin: this.defaultStructure,
      CODout: this.defaultStructure,
      CODred: this.defaultStructure,
      alpha: this.defaultStructure,
      energy: this.defaultStructure
    },
    organics: {
      flow: 0,
      COD: 0
    },
    biosolids: {
      flow: 0,
      COD: 0
    },
    disposal: {
      plantinfluent: '1',
      co2: 0,
      ch4: 0,
      Qin: 0,
      totalCo2: 0,
      FLOWin: this.defaultStructure,
      CODin: this.defaultStructure,
      carbon_methane: this.defaultStructure,
      alpha: this.defaultStructure,
    },
    transporation: {
      plantinfluent: '1',
      totalCo2: 0,
      Qin: 0,
      travel_type: 'distance',
      FLOWin: this.defaultStructure,
      distance: this.defaultStructure,
      time: this.defaultStructure,
      trip: this.defaultStructure
    },
  };
  constant: any = {
    COD_TOC: this.defaultStructure,
    Removed_TKN: this.defaultStructure
  };
  active_sludgeData = {
    Qin: 0,
    Qwas: 0,
    Qout: 0,
    co2: 0,
    no2: 0,
    totalCo2: 0
  };
  aerobicData = {
    Qin: 0,
    Qout: 0,
    co2: 0,
    ch4: 0,
    totalCo2: 0
  };
  anarobicData = {
    Qap: 0,
    Qin: 0,
    Qout: 0,
    CODLod: 0,
    CODin: 0,
    co2: 0,
    ch4: 0,
    totalCo2: 0,
    ch4WWTP:0,
    ch4External:0,
    addEnergy:0
  };
  disposalData = {
    Qin: 0,
    Qout: 0,
    co2: 0,
    ch4: 0,
    totalCo2: 0
  };
  transporationData = {
    Qin: 0,
    Qout: 0,
    co2: 0,
    ch4: 0,
    totalCo2: 0
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
  metal_salts_type: any;
  chlorination_type: any;
  dechlorination_type: any;
  chlorine_type:any
  isCollapsed = false;
  isChart = false;
  iconCollapse = 'icon-arrow-up';
  totalElecricalCo2: any = 0;
  totalChemicalCo2: any = 0;
  totalOnSiteCo2: any = 0;
  totalDisposalCo2: any = 0;
  totalTransportationCo2: any = 0;
  totalEnergyCo2: any = 0;
  totalBiolidDisposalCo2: any = 0;
  result: any = {};
  id: string;
  sid: string;
  tempBoolen = true;
  unit = 1;
  unitDivider = 1;
  totalEqCo2 = 0;
  totalProcessCo2 = 0;

  ElecricalCo2: any = 0;
  OnSiteCo2: any = 0;
  ChemicalCo2: any = 0;
  DisposalCo2: any = 0;
  EnergyCo2: any = 0;
  TransportationCo2: any = 0;
  EqCo2: any = 0

  active_sludgeco2: any = 0;
  aerobicco2: any = 0;
  anarobicco2: any = 0;
  disposalco2: any = 0;

  active_sludgeno2: any = 0;

  aerobicch4: any = 0;
  anarobicch4: any = 0;
  disposalch4: any = 0;

  active_sludgetotalCo2: any = 0
  aerobictotalCo2: any = 0;
  anarobictotalCo2: any = 0;
  disposaltotalCo2: any = 0;
  transporationtotalCo2: any = 0;

  ProcessCo2: any = 0;
  isInternal: number=0;
  newHtml:string="No references";
  rangeHTML: string="No references";
  infoHTML: string="No Info";
  viewMode:boolean=false;
  scenarioSaved:boolean=false;
  isSavedScenario:boolean=true;
  hideBiogas:boolean=false;
  // *************  barChart Start *************//

  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgb(181,230,29)',
      borderWidth: 0
    }
  ];
  public barChartOptions: any = {
    title: {
      display: true,
      text: 'Categorized CO2 Emission - Electricity Usage (CO2e)',
      fontSize: 14,
      padding:25
    },
    scaleShowVerticalLines: false,
    responsive: true,
   //backgroundColor: 'rgba(148,159,177,0.2)',
    scales: {
      xAxes: [{
        barPercentage: 2.0,
        categoryPercentage: 1.0,
        barThickness: 50,
        ticks: {
          autoSkip: false
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: {
          weight: 'bold'
        }
      }
    }
  };

  public barChartLabels: string[] = ['206', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 21]}
  ];


  // *************  stackChart Start *************//

  public stackChart1Colours: Array<any> = [
    {
      //backgroundColor: 'rgba(102,178,255,.3)',
      borderWidth: 0
    }
  ];
  public stackChartOptions: any = {
    title: {
      display: true,
      text: 'On-Site Process Emissions (CO2e)',
      fontSize: 14
    },
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: 'rgba(148,159,177,0.2)',
    scales: {
      xAxes: [{
        //categoryPercentage: 1.0,
        barPercentage: 2.0,
        categoryPercentage: 1.0,
        barThickness: 50,
        ticks: {
          autoSkip: false
        },
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    },
    plugins: {
      datalabels: {
        display: function(context) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
        },
        color:'#000000'
      }
    }
  };

  public stackChartLabels: string[] = ['Activated Sludge', 'Aerobic Digester', 'Anaerobic Digester', 'Total'];
  public stackChartType = 'bar';
  public stackChartLegend = true;

  public stackChartData: any[] = [
     {
      label: 'CO2 Emission',
      data: [67.8,12,16],
      backgroundColor: '#00A2E8' // green
    },
    {
      label: 'N2O Emission',
      data: [20.7,18,20],
      backgroundColor: '#FF7F27' // yellow
    },
    {
      label: 'CH4 Emission',
      data: [11.4,22,24],
      backgroundColor: '#B5E61D' // red
    }
  ];

  // Pie
  public pieChartLabels: string[] = ['Electricity', 'Chemicals', 'Transportation', 'On-site Emissions Processes', 'Biosolids Disposal'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: 'CO2 Emissions by Category',
      fontSize: 14,
      padding:95
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontColor: 'black',
        fontSize : 12,
        padding:40
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 100,
        bottom: 50
      }
    },
    plugins: {

      datalabels: {
        formatter: (value, piChart) => {
        //  console.log(piChart.dataset._meta[0].total);
          piChart.dataset.backgroundColor=["#FEFF00", "#FF98FF",'#6F319F','#02B0F0','#C55A11'];
          let sum = 0;
          let dataArr = piChart.dataset.data;
          dataArr.map(data => {
            sum += data;
          });

        // sum = piChart.dataset._meta[0].total;

          let percentage = Math.ceil(value * 100 / sum) + '%';

          return percentage;
        },
        display: function(context) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
        },
        color: '#000',
        font:{
          size:0
        }
      },

      outlabels:{
        text: '%l: %p',
        color: ["black", "black",'white','black','black'],
        stretch:20,
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18
        }
      }
    }
  };
  ngOnInit() {
    this.scenarioLength = ( parseInt(this.route.snapshot.paramMap.get('length')) + 1);
    this.scenarioLengthTemp = parseInt(this.route.snapshot.paramMap.get('viewFlag'));
    if(this.scenarioLengthTemp==0){
      this.viewMode=true;
    }
    if (this.scenarioLength) {
    this.scenarioName = this.scenarioName + ' '  + this.scenarioLength; }
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.dataServiceService.getProjectData()) {
      this.setProjectData = this.dataServiceService.getProjectData().name;
      this.setProjectDescription = this.dataServiceService.getProjectData().desc;
    } else  {
      if (this.id) {
        this.userService.getScenario({project_id: this.id}).subscribe((response: any) => {
          this.setProjectData = response.data.name;
          this.setProjectDescription = response.data.desc;
        });
      }
    }
    // this.setScenario();

    const data = this.userService.getData().subscribe((resp: any) => {
      Object.assign(this.primary.pumping, this.defaulValaue.data);
      this.assignFormValue(resp);
    });

    this.sid = this.route.snapshot.paramMap.get('sid') || null;
    if (this.sid === "null") {
      this.sid = null;
    }



  }
  confirm(): boolean {
    if(this.scenarioSaved || this.viewMode){
      return true;
    }else {
      return confirm("Scenario is not saved! Discard Scenario?");
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
  callbackAssign(){
    if (this.sid !== null) {
      const details = this.userService.getScenarioDatils({s_id: this.sid}).subscribe((res: any) => {
        if (res.status == 1) {
          this.assignEditFormValue(res.data);
        }
      });
    }else {
      this.updateWWTPsize();
    }
  }

  assignFormValue(data) {

      this.sizeData(data.size);
      this.secondaryData(data.secondary);
      this.primaryData(data.primary);
      this.secondaryClarification(data.secondary_clarification);
      this.tertiaryData(data.tertiary);
      this.disinfectionData(data.disinfection);
      this.biosolidsData(data.biosolids);
      this.biogasData(data.biogas);
      this.dewateringData(data.dewatering);
      this.biosolids_disposalData(data.biosolids_disposals);
      this.chemicalData(data.chemical);
      this.constantData(data.constant);
      //this.updateWWTPsize();

      this.userService.getPrimaryAllData().subscribe((response: any) => {
          // this.primarNewData = response.data;
              this.secondaryData(response.data.secondary);
              this.primaryData(response.data.primary);
              this.secondaryClarification(response.data.secondary_clarification);
              this.tertiaryData(response.data.tertiary);
              this.disinfectionData(response.data.disinfection);
              this.biosolidsData(response.data.biosolids);
              this.biogasData(response.data.biogas);
              this.dewateringData(response.data.dewatering);
              this.biosolids_disposalData(response.data.biosolids_disposals);
              this.chemicalData(response.data.chemical);
         // this.updateWWTPsize();
        });

      this.userService.getProcessAllData().subscribe((response: any) => {
        this.processData(response.data);
        this.callbackAssign();
      });
      this.createChart();
  }
  assignEditFormValue(editData) {
    if (editData.data) {
      this.scenarioName = editData.name;
      this.scenarioDesc = editData.desc;
      this.scenarioDate = editData.created_date;
      const fielddData = editData.data;
      for (const field of this.fields) {
        this[field] = fielddData[field];
        if(field === 'secondary'){
          for (const type of this.growth_types) {
            if (type.title === this.secondary.sel_growth_type) {
              this.secondary_types = type.treatment_type;
            }
          }
        }
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
  chemicalData(chemical) {
    this.metal_salts_type = chemical.metal_salts;
    this.chlorination_type = chemical.chlorination;
    this.dechlorination_type = chemical.dechlorination;
    this.chlorine_type = chemical.Chlorine;
  }
  processData(processData) {
    this.process.aerobic = processData.aerobic;
    this.process.anarobic = processData.anarobic;
    this.process.active_sludge = processData.active_sludge;
    this.process.disposal = processData.disposal;
    this.process.transporation = processData.transporation;
    this.active_sludgeData.Qin = this.size.data.default;
    // if (this.process.anarobic.Qin) {
    //   this.active_sludgeData.Qin = this.process.anarobic.Qin;
    // }
  }
  constantData(data){
    this.constant = data;
  }
  updateWWTPsize() {
    // console.log(this.size.sel_size);
    // if(this.size.data.default >= 50000 ){
    //   for (const s_type of this.size_types) {
    //     if (s_type.title !== this.size.sel_size) {
    //       this.size.data = s_type;
    //       break;
    //     }
    //   }
    // }
    if ( this.secondary.sel_growth_type !== '0' ) {
      if (this.sec_clr.sel_type === '0') {
        this.sec_clr.sel_type = 'Secondary Clarifier';
        this.selectTreatmentType('', 'sec_clr', this.sec_clr_types);
      }
    } else {
        this.sec_clr.sel_type = '0';
        this.selectTreatmentType('', 'sec_clr', this.sec_clr_types);
    }

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
    this.ChemicalCo2Calcaltion(this.chemical.metal_salts.data);
    this.ChemicalCo2Calcaltion(this.chemical.chlorination.data);
    this.ChemicalCo2Calcaltion(this.chemical.dechlorination.data);
    this.ChemicalCo2Calcaltion(this.chemical.chlorine.data);
    this.active_sludgeData.Qin = this.size.data.default;

    // if (this.process.anarobic.Qin) {
    //   this.active_sludgeData.Qin = this.process.anarobic.Qin;
    // }

    this.createChart();
  }

  calActiveFlow() {
    this.active_sludgeData.Qwas = Math.ceil(this.active_sludgeData.Qin * this.process.active_sludge.FLOWwas.default / 100);
    this.active_sludgeData.Qout = Math.ceil(this.active_sludgeData.Qin - this.active_sludgeData.Qwas);
    this.calcActiveCo2();
  }
  calcActiveCo2() {
    const c1 = this.active_sludgeData.Qin * this.process.active_sludge.CODin.default - this.active_sludgeData.Qout * this.process.active_sludge.CODout.default - this.active_sludgeData.Qwas * this.process.active_sludge.CODwas.default;
    const calCo2 = (c1 / this.constant.COD_TOC.default) * (44 / 12) * (1 / 1000);
    this.active_sludgeData.co2 = Math.ceil(calCo2);

    const n1 = this.active_sludgeData.Qin * this.process.active_sludge.TKNin.default - this.active_sludgeData.Qout * this.process.active_sludge.TKNout.default - this.active_sludgeData.Qwas * this.process.active_sludge.TKNwas.default;
    const calNo2 = (n1 * this.constant.Removed_TKN.default * 0.01) * (1 / 1000) * 296;
    this.active_sludgeData.no2 = Math.ceil(calNo2);

    this.active_sludgeData.totalCo2 = this.active_sludgeData.co2 + this.active_sludgeData.no2;
    this.active_sludgeData.totalCo2 = Math.ceil(this.active_sludgeData.totalCo2);
    this.process.active_sludge.co2 = this.active_sludgeData.co2;
    this.process.active_sludge.no2 = this.active_sludgeData.no2;
    this.process.active_sludge.totalCo2 = this.active_sludgeData.totalCo2;
    this.UpdateProcessValue();
  }

  selectPlantInflent(type) {
    if (type === 'aerobic') {
      this.aerobicData.Qin = 0;
      this.calAerobicFlow();
    } else if (type === 'anarobic') {
      this.anarobicData.Qin = 0;
      this.calAnarobicFlow();
    } else if (type === 'transporation') {
      this.transporationData.Qin = 0;
      this.calTransporationFlow();
    } else if (type === 'disposal') {
      this.disposalData.Qin = 0;
      this.calDisposalFlow();
    }
  }

  calAerobicFlow() {
    if (this.process.aerobic.plantinfluent == '1') {
      this.aerobicData.Qin = this.process.aerobic.FLOWin.default * this.size.data.default / 100;
    } else {
      if (this.process.aerobic.Qin !== undefined) {
      this.aerobicData.Qin = this.process.aerobic.Qin;
      }
    }
    this.aerobicData.Qout =  Math.ceil(this.aerobicData.Qin);
    this.calcAerobicCo2();
  }
  calcAerobicCo2() {
    const c1 = this.aerobicData.Qin * this.process.aerobic.CODin.default - this.aerobicData.Qout * this.process.aerobic.CODout.default;
    const calCo2 = (c1 / this.constant.COD_TOC.default) * (44 / 12) * (1 / 1000);
    this.aerobicData.co2 =  Math.ceil(calCo2);
    this.aerobicData.ch4 = 0;
    this.aerobicData.totalCo2 = Math.ceil(this.aerobicData.co2);

    if (this.biosolid.aerobic.sel_type !== '0') {
      this.process.aerobic.co2 = this.aerobicData.co2;
      this.process.aerobic.ch4 = 0;
      this.process.aerobic.totalCo2 = this.aerobicData.totalCo2;
    } else {
      this.process.aerobic.co2 = 0;
      this.process.aerobic.ch4 = 0;
      this.process.aerobic.totalCo2 = 0;
    }
    this.UpdateProcessValue();
  }
  calAnarobicFlow() {
    if (this.process.anarobic.plantinfluent == '1') {
      this.anarobicData.Qap = Math.ceil(this.process.anarobic.FLOWin.default * this.size.data.default / 100);
    } else {
      if (this.process.anarobic.Qin !== undefined) {
      this.anarobicData.Qin =  Math.ceil(this.process.anarobic.Qin);
      }
    }

    this.anarobicData.Qin = this.anarobicData.Qap;
    this.anarobicData.CODLod = (this.anarobicData.Qap * this.process.anarobic.CODin.default) / 1000;

    if (this.process.anarobic.isOrganic == 1) {
      this.anarobicData.Qin =  Math.ceil(this.anarobicData.Qin + this.process.organics.flow);
      this.anarobicData.CODLod = this.anarobicData.CODLod + (this.process.organics.flow * this.process.organics.COD / 1000);
    }else{
      this.process.organics.flow=0;
      this.process.organics.COD=0;
    }

    if (this.process.anarobic.isBiosolids == 1) {
      this.anarobicData.Qin =  Math.ceil(this.anarobicData.Qin + this.process.biosolids.flow);
      this.anarobicData.CODLod = this.anarobicData.CODLod + (this.process.biosolids.flow * this.process.biosolids.COD / 1000);
    }else{
      this.process.biosolids.flow=0;
      this.process.biosolids.COD=0;
    }
    this.anarobicData.CODLod = Math.ceil(this.anarobicData.CODLod);
    if (this.anarobicData.Qin) {
      this.anarobicData.CODin = (this.anarobicData.CODLod / this.anarobicData.Qin) * 1000;
    } else {
      this.anarobicData.CODin = 0;
    }
    this.anarobicData.CODin = Math.ceil(this.anarobicData.CODin);
    this.anarobicData.Qout = Math.ceil(this.anarobicData.Qin);
    if (this.process.anarobic.isOrganic == 0 && this.process.anarobic.isBiosolids == 0) {
      this.process.anarobic.isExternal=0;
    } else {
      this.process.anarobic.isExternal=1;
    }

    this.calcAnarobicCo2();
  }
  calcAnarobicCo2() {
    const temp = (this.anarobicData.Qin * this.anarobicData.CODin - this.anarobicData.Qout * this.process.anarobic.CODout.default) / this.COD_TOC_PER_MOL;
    const alpha = this.process.anarobic.alpha.default / 100;
    const calCo2 = temp * (1 - alpha) * 0.044;
    this.anarobicData.co2 = Math.ceil(calCo2);
    let calCh4 = 0;
    if (this.biogas.sel_type !== '0') {
      calCh4 = temp * alpha * 0.044;
      this.anarobicData.ch4 = Math.ceil(calCh4);
      let anCh4 = this.anarobicData.co2 + this.anarobicData.ch4;
      this.anarobicData.co2  = Math.ceil(anCh4);
      this.anarobicData.ch4 = 0;
      if(this.process.anarobic.isFlaring==1){
        this.process.anarobic.isExternal=0;
      }
    } else {
      calCh4 = temp * alpha * 0.016 * 25;
      this.anarobicData.ch4 = Math.ceil(calCh4);
      this.process.anarobic.isExternal=0;
    }

    this.anarobicData.totalCo2 = this.anarobicData.co2 + this.anarobicData.ch4;
    this.anarobicData.totalCo2 = Math.ceil( this.anarobicData.totalCo2);
    if (this.biosolid.anaerobic.sel_type !== '0') {
      this.process.anarobic.co2 = this.anarobicData.co2;
      this.process.anarobic.ch4 = this.anarobicData.ch4;
      this.process.anarobic.totalCo2 = this.anarobicData.totalCo2;
    } else {
      this.process.anarobic.co2 = 0;
      this.process.anarobic.ch4 = 0;
      this.process.anarobic.totalCo2 = 0;
    }
    //External Enegry Calculation

    if (this.process.anarobic.isExternal === 1) {
      this.anarobicData.ch4WWTP = (this.anarobicData.Qap * (this.process.anarobic.CODin.default - this.process.anarobic.CODout.default) / this.COD_TOC_PER_MOL) * alpha * 0.016;
      this.anarobicData.ch4WWTP = Math.ceil(this.anarobicData.ch4WWTP);
      const tempEnergy = this.anarobicData.Qin * (this.anarobicData.CODin - this.process.anarobic.CODout.default) - this.anarobicData.Qap * (this.process.anarobic.CODin.default - this.process.anarobic.CODout.default);
      this.anarobicData.ch4External = Math.ceil((tempEnergy / this.COD_TOC_PER_MOL) * alpha * 0.016);
      this.anarobicData.addEnergy = Math.ceil((this.anarobicData.ch4External * this.process.anarobic.energy.default));
    } else {
     // this.anarobicData.ch4WWTP=0;
      this.anarobicData.ch4External=0;
      this.anarobicData.addEnergy=0;
    }
    this.UpdateProcessValue();
  }
  calDisposalFlow() {
    if (this.process.disposal.plantinfluent == '1') {
      this.disposalData.Qin = Math.ceil(this.process.disposal.FLOWin.default * this.size.data.default / 100);
    } else {
      if (this.process.disposal.Qin !== undefined) {
      this.disposalData.Qin = Math.ceil(this.process.disposal.Qin);
      }
    }
    this.calDisposalCo2();
  }
  calDisposalCo2() {
    const c1 = this.disposalData.Qin * this.process.disposal.CODin.default;
    const alpha = this.process.disposal.alpha.default / 100;
    let calCo2 = (c1 / this.COD_TOC_PER_MOL) * (1 - alpha) * (44 / 1000);
    if (this.biosolids_disposals.disposal.sel_type === 'Landfill with Methane Recovery' || this.biosolids_disposals.disposal.sel_type === 'Incineration' ) {
      calCo2 = (c1 / this.COD_TOC_PER_MOL) * (44 / 1000);
    }

    this.disposalData.co2 =  Math.ceil(calCo2);

    const calCh4 = (c1 / this.COD_TOC_PER_MOL) * alpha * (16 / 1000) * 25;
    this.disposalData.ch4 = Math.ceil(calCh4);

    if (this.biosolids_disposals.disposal.sel_type === 'Landfill with Methane Recovery' || this.biosolids_disposals.disposal.sel_type === 'Incineration' ) {
      this.disposalData.ch4 = 0;
    }
    else if (this.biosolids_disposals.disposal.sel_type === 'Land Application') {
      this.disposalData.totalCo2 = 0;
      this.disposalData.ch4 = 0;
      this.disposalData.co2 = 0;
    }
    this.disposalData.totalCo2 = this.disposalData.co2 + this.disposalData.ch4;
    this.disposalData.totalCo2 = Math.ceil(this.disposalData.totalCo2);

    this.process.disposal.co2 = this.disposalData.co2;
    this.process.disposal.ch4 = this.disposalData.ch4;
    this.process.disposal.totalCo2 =  this.disposalData.totalCo2;
    this.UpdateProcessValue();
  }
  calTransporationFlow() {
    if (this.process.transporation.plantinfluent == '1') {
      this.transporationData.Qin = Math.ceil(this.process.transporation.FLOWin.default * this.size.data.default / 100);
    } else {
      if (this.process.transporation.Qin !== undefined) {
        this.transporationData.Qin = Math.ceil(this.process.transporation.Qin);
      }
    }
    this.calTransporationCo2();
  }
  calTransporationCo2() {
    if (this.process.transporation.travel_type === 'time') {
      let calCo2 = this.transporationData.Qin  * this.process.transporation.time.default * this.delta;
     // calCo2 = calCo2 * this.process.transporation.trip.default;
      this.process.transporation.totalCo2 = Math.ceil(calCo2);
    }

    if (this.process.transporation.travel_type === 'distance') {
      let calCo2 = this.transporationData.Qin  * this.process.transporation.distance.default * this.gamma;
      //calCo2 = calCo2 * this.process.transporation.trip.default;
      this.process.transporation.totalCo2 = Math.ceil(calCo2);
    }
  this.UpdateProcessValue();
  }

  // this.barChartLabels = [this.primary.pumping.title, this.primary.prili_treat.data.title, this.primary.prili_treat.data.title,
  //   this.secondary.data.title, this.secondary.sec_clr.title, this.tertiary.data.title, this.disinfection.data.title,
  //   this.biosolid.digester.data.title, this.biosolid.thickener.data.title, this.biosolid.dewatering.data.title];

  UpdateProcessValue(){
    this.totalOnSiteCo2 = 0;
    this.totalTransportationCo2 = 0;
    this.totalDisposalCo2 = 0;
    if (this.biosolid.aerobic.sel_type !== '0') {
      this.totalElecricalCo2 += JSON.parse(this.biosolid.aerobic.data.co2);
      this.totalOnSiteCo2 = this.totalOnSiteCo2 + this.process.aerobic.totalCo2;
    }

    if (this.biosolid.anaerobic.sel_type !== '0') {
      this.totalElecricalCo2 += JSON.parse(this.biosolid.anaerobic.data.co2);
      this.totalOnSiteCo2 = this.totalOnSiteCo2 + this.process.anarobic.totalCo2;
    }
    this.totalOnSiteCo2 = this.totalOnSiteCo2  + this.active_sludgeData.totalCo2;
    this.totalDisposalCo2 = this.totalDisposalCo2 + this.disposalData.totalCo2;
    this.totalTransportationCo2 = this.totalTransportationCo2 + this.process.transporation.totalCo2;
    this.SummaryReport();
  }
  createChart() {
    if (this.biogas.sel_type === 'Flaring') {
      this.process.anarobic.isFlaring = 1;
    }
    else{
      this.process.anarobic.isFlaring = 0;
    }
    if(this.biosolid.anaerobic.sel_type!='0'){
      this.hideBiogas=true;
    }else {
      this.biogas.sel_type='0';
      this.co2Calcaltion(this.biogas);
      this.hideBiogas=false;
    }

    this.calActiveFlow();
    this.calAerobicFlow();
    this.calAnarobicFlow();
    this.calDisposalFlow();
    this.calTransporationFlow();
    this.isChart = true;
    this.barChartLabels = [];
    this.totalElecricalCo2 = 0;
    this.totalChemicalCo2 = 0;
    this.totalOnSiteCo2 = 0;
    this.totalBiolidDisposalCo2 = 0;
    this.totalTransportationCo2 = 0;
    this.totalDisposalCo2 = 0;
    this.totalEnergyCo2 = 0;
    const newData = [];
     if (this.primary.pumping.sel_type !== '0') {
       if (this.primary.pumping.data.title === 'User Specified') {
         this.barChartLabels.push(this.primary.pumping.data.uvalue);
       } else {
         this.barChartLabels.push(this.primary.pumping.data.title);
       }
         newData.push(this.primary.pumping.data.co2);
         this.totalElecricalCo2 += JSON.parse(this.primary.pumping.data.co2);
     }

    if (this.primary.prili_treat.sel_type !== '0') {
      if (this.primary.prili_treat.data.title === 'User Specified') {
        this.barChartLabels.push(this.primary.prili_treat.data.uvalue);
      } else {
        this.barChartLabels.push(this.primary.prili_treat.data.title);
      }
      newData.push(this.primary.prili_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.prili_treat.data.co2);
    }

    if (this.primary.pri_treat.sel_type !== '0') {
      if (this.primary.pri_treat.data.title === 'User Specified') {
        this.barChartLabels.push(this.primary.pri_treat.data.uvalue);
      } else {
        this.barChartLabels.push(this.primary.pri_treat.data.title);
      }
      newData.push(this.primary.pri_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.pri_treat.data.co2);
    }

    if (this.secondary.sel_type !== '0') {
      if (this.secondary.data.title === 'User Specified') {
        this.barChartLabels.push(this.secondary.data.uvalue);
      } else {
        this.barChartLabels.push(this.secondary.data.title);
      }
     // this.barChartLabels.push(this.secondary.data.title);
      newData.push(this.secondary.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.secondary.data.co2);
    }
    if (this.sec_clr.sel_type !== '0') {
      if (this.sec_clr.data.title === 'User Specified') {
        this.barChartLabels.push(this.sec_clr.data.uvalue);
      } else {
        this.barChartLabels.push(this.sec_clr.data.title);
      }
      newData.push(this.sec_clr.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.sec_clr.data.co2);
    }
    if (this.tertiary.sel_type !== '0') {
      if (this.tertiary.data.title === 'User Specified') {
        this.barChartLabels.push(this.tertiary.data.uvalue);
      } else {
        this.barChartLabels.push(this.tertiary.data.title);
      }
      newData.push(this.tertiary.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.tertiary.data.co2);
    }
    if (this.disinfection.sel_type !== '0') {
      if (this.disinfection.data.title === 'User Specified') {
        this.barChartLabels.push(this.disinfection.data.uvalue);
      } else {
        this.barChartLabels.push(this.disinfection.data.title);
      }
      newData.push(this.disinfection.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.disinfection.data.co2);
    }
    if (this.biosolid.aerobic.sel_type !== '0') {
      if (this.biosolid.aerobic.data.title === 'User Specified') {
        this.barChartLabels.push(this.biosolid.aerobic.data.uvalue);
      } else {
        this.barChartLabels.push(this.biosolid.aerobic.data.title);
      }
      newData.push(this.biosolid.aerobic.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.biosolid.aerobic.data.co2);
      this.totalOnSiteCo2 = this.totalOnSiteCo2 + this.process.aerobic.totalCo2;
    }
    if (this.biosolid.thickener.sel_type !== '0') {
      if (this.biosolid.thickener.data.title === 'User Specified') {
        this.barChartLabels.push(this.biosolid.thickener.data.uvalue);
      } else {
        this.barChartLabels.push(this.biosolid.thickener.data.title);
      }
      newData.push(this.biosolid.thickener.data.co2);
       this.totalElecricalCo2 += JSON.parse(this.biosolid.thickener.data.co2);
    }
    if (this.biosolid.anaerobic.sel_type !== '0') {
      if (this.biosolid.anaerobic.data.title === 'User Specified') {
        this.barChartLabels.push(this.biosolid.anaerobic.data.uvalue);
      } else {
        this.barChartLabels.push(this.biosolid.anaerobic.data.title);
      }
      newData.push(this.biosolid.anaerobic.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.biosolid.anaerobic.data.co2);
      this.totalOnSiteCo2 = this.totalOnSiteCo2 + this.process.anarobic.totalCo2;
    }
    if (this.dewatering.sel_type !== '0') {
      if (this.dewatering.data.title === 'User Specified') {
        this.barChartLabels.push(this.dewatering.data.uvalue);
      } else {
        this.barChartLabels.push(this.dewatering.data.title);
      }
      newData.push(this.dewatering.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.dewatering.data.co2);
    }
    if (this.biogas.sel_type === 'Energy Recovery') {
      this.barChartLabels.push(this.biogas.data.title);
      if(this.biogas.data.co2<0)
        this.biogas.data.co2 = this.biogas.data.co2;
      else
        this.biogas.data.co2 = -this.biogas.data.co2;
      this.totalEnergyCo2 = this.biogas.data.co2;
      this.isInternal=1;
      newData.push(this.totalEnergyCo2);
    }else{
      this.isInternal=0;
    }

    if (this.chemical.metal_salts.sel_type !== '0') {
      this.totalChemicalCo2 += JSON.parse(this.chemical.metal_salts.data.co2);
    }
    if (this.chemical.chlorination.sel_type !== '0') {
      this.totalChemicalCo2 += JSON.parse(this.chemical.chlorination.data.co2);
    }
    if (this.chemical.dechlorination.sel_type !== '0') {
      this.totalChemicalCo2 += JSON.parse(this.chemical.dechlorination.data.co2);
    }
    if (this.chemical.chlorine.sel_type !== '0') {
      this.totalChemicalCo2 += JSON.parse(this.chemical.chlorine.data.co2);
    }
    this.totalOnSiteCo2 = this.totalOnSiteCo2  + this.active_sludgeData.totalCo2;
    this.totalDisposalCo2 = this.totalDisposalCo2 + this.disposalData.totalCo2;
    this.totalTransportationCo2 = this.totalTransportationCo2 + this.process.transporation.totalCo2;
    for (let i = 0, length = newData.length; i < length; i++) {
      newData[i] = Math.ceil(newData[i] / this.unitDivider);
    }

    this.SummaryReport();

    if(this.process.anarobic.addEnergy!==0){
      this.barChartLabels.push("External Energy Recovery");
      newData.push(this.process.anarobic.addEnergy);
    }
    this.barChartData = [
      {data: newData}
    ];
     this.pieChartLabels = [];
     this.pieChartData = [];
    // if(this.totalElecricalCo2){
    //   this.pieChartLabels.push('Electricity');
    //   this.pieChartData.push(this.totalElecricalCo2);
    // }
    // if(this.totalChemicalCo2){
    //   this.pieChartLabels.push('Chemicals');
    //   this.pieChartData.push(this.totalChemicalCo2);
    // }
    // if(this.totalTransportationCo2){
    //   this.pieChartLabels.push('Transportation');
    //   this.pieChartData.push(this.totalTransportationCo2);
    // }
    // if(this.totalOnSiteCo2){
    //   this.pieChartLabels.push('On-site Emissions Processes');
    //   this.pieChartData.push(this.totalOnSiteCo2);
    // }
    // if(this.totalDisposalCo2){
    //   this.pieChartLabels.push('Biosolids Disposal');
    //   this.pieChartData.push(this.totalDisposalCo2);
    // }
    this.pieChartLabels = ['Electricity', 'Chemicals', 'Transportation', 'On-site Emissions Processes', 'Biosolids Disposal'];
    this.pieChartData = [this.ElecricalCo2 , this.ChemicalCo2, this.TransportationCo2, this.OnSiteCo2, this.DisposalCo2];
    if(this.chart!==undefined) {
       this.chart.labels = this.barChartLabels;
       this.chart.ngOnInit();
    }
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

        if(this[type].sel_type !== 'Chlorination/De-Chlorination'){
          this.chemical.chlorination.sel_type = '0';
          this.chemical.dechlorination.sel_type = '0';
          this.selectTreatmentType('chemical','chlorination',this.chlorination_type);
          this.selectTreatmentType('chemical','dechlorination',this.dechlorination_type)
        }

      }
    } else {
      if(cat === 'biosolids_disposals' && type === 'transportation'){
        //console.log();
        if(this[cat][type].sel_type.indexOf('Time')>-1){
          this.process.transporation.travel_type = 'time';
        }else if(this[cat][type].sel_type.indexOf('Distance')>-1){
          this.process.transporation.travel_type = 'distance';
        }
        this.selectPlantInflent('transporation');
      }
      for (const tr_type of treatment_types) {
        if (this[cat][type].sel_type === '0') {
          this[cat][type].data = this.co2Calcaltion(this.defaulValaue.data);
        }

        if (tr_type.title === this[cat][type].sel_type) {
          // this.information[cat][type].ref = tr_type.ref;
          // for (const key in this.information[cat][type].ref) {
          //   console.log(this.information[cat][type].ref[key]);
          // }
          if (cat === 'chemical') {
            this[cat][type].data = this.ChemicalCo2Calcaltion(tr_type);
          } else {
            this[cat][type].data = this.co2Calcaltion(tr_type);
          }

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
    data.co2 = Math.ceil(calculation);
    return data;
  }

  ChemicalCo2Calcaltion(data) {
    const calculation = (data.default * data.co2_eq * this.size.data.default ) / 1000;
    data.co2 = Math.ceil(calculation);
    return data;
  }

  changeUnit() {
    if (this.unit === 0) {
      this.unitDivider = this.size.data.default / 1000;
    } else if (this.unit === 1) {
      this.unitDivider = 1;
    } else if (this.unit === 2) {
      this.unitDivider = 1000 / 365;
    }

    this.createChart();
  }

  SummaryReport() {
    this.ElecricalCo2 = Math.ceil(this.totalElecricalCo2 / this.unitDivider);//Math.ceil());
    this.OnSiteCo2 = Math.ceil(this.totalOnSiteCo2 / this.unitDivider);
    this.ChemicalCo2 = Math.ceil(this.totalChemicalCo2 / this.unitDivider);
    this.DisposalCo2 = Math.ceil(this.totalDisposalCo2 / this.unitDivider);
    this.EnergyCo2 = Math.ceil(this.totalEnergyCo2 / this.unitDivider);
    this.TransportationCo2 = Math.ceil(this.totalTransportationCo2 / this.unitDivider);
    this.process.anarobic.addEnergy = Math.ceil(this.anarobicData.addEnergy / this.unitDivider);
    this.EqCo2  = Math.ceil(this.ElecricalCo2 + this.OnSiteCo2 + this.ChemicalCo2 + this.DisposalCo2 + this.EnergyCo2 + this.TransportationCo2+ this.process.anarobic.addEnergy);


    this.active_sludgeco2 = Math.ceil(this.process.active_sludge.co2 / this.unitDivider);
    this.aerobicco2 = Math.ceil(this.process.aerobic.co2 / this.unitDivider);
    this.anarobicco2 = Math.ceil(this.process.anarobic.co2 / this.unitDivider);
    this.disposalco2 = Math.ceil(this.process.disposal.co2 / this.unitDivider);

    this.active_sludgeno2 = Math.ceil(this.process.active_sludge.no2 / this.unitDivider);

    this.aerobicch4 =  Math.ceil(this.process.aerobic.ch4 / this.unitDivider);
    this.anarobicch4 = Math.ceil(this.process.anarobic.ch4 / this.unitDivider);
    this.disposalch4 = Math.ceil(this.process.disposal.ch4 / this.unitDivider);

    this.active_sludgetotalCo2 = Math.ceil(this.process.active_sludge.totalCo2 / this.unitDivider);
    this.aerobictotalCo2 = Math.ceil(this.process.aerobic.totalCo2 / this.unitDivider);
    this.anarobictotalCo2 = Math.ceil(this.process.anarobic.totalCo2 / this.unitDivider);
    this.disposaltotalCo2 = Math.ceil(this.process.disposal.totalCo2 / this.unitDivider);
    this.transporationtotalCo2  = Math.ceil(this.process.transporation.totalCo2 / this.unitDivider);

    this.ProcessCo2 = Math.ceil(this.active_sludgetotalCo2 + this.aerobictotalCo2 + this.anarobictotalCo2 + this.disposaltotalCo2 + this.transporationtotalCo2);

    this.stackChartData= [
      {
        label: 'CO2 Emission',
        data: [this.active_sludgeco2,this.aerobicco2,this.anarobicco2,Math.ceil(this.active_sludgeco2+this.aerobicco2+this.anarobicco2)],
        backgroundColor: '#00A2E8' // green
      },
      {
        label: 'N2O Emission',
        data: [this.active_sludgeno2,0,0,this.active_sludgeno2],
        backgroundColor: '#FF7F27' // yellow
      },
      {
        label: 'CH4 Emission',
        data: [0,this.aerobicch4,this.anarobicch4, Math.ceil(this.aerobicch4 + this.anarobicch4)],
        backgroundColor: '#B5E61D' // red
      }
    ];

  }
  // *************  Common Function  End *************//

  tabClick(){
    if(this.chart!==undefined) {
      this.chart.labels = this.barChartLabels;
      this.chart.ngOnInit();
    }
  }
  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  generatePdf() {
    const div = document.getElementById('printSection');
    const options = {};


    html2canvas(div, {allowTaint: true}).then(function(canvas) {

      const HTML_Width = canvas.width;
      const HTML_Height = canvas.height;
      const top_left_margin = 50;
      const PDF_Width = HTML_Width + (top_left_margin * 2);
      const PDF_Height = (PDF_Width*1.3) -50;
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
        const w2 = img.width;
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

    this.process.aerobic.Qin = this.aerobicData.Qin;
    this.process.anarobic.Qin = this.aerobicData.Qin;
    this.process.disposal.Qin = this.disposalData.Qin;
    this.process.transporation.Qin = this.transporationData.Qin;

    for (const field of this.fields) {
      this.result[field] = this[field];
    }
    test = this.result;
    const scenarioData = {name: this.scenarioName, desc: this.scenarioDesc, data: test, project_id: this.id};

    this.modelMsg = "Wait.....";
    this.modelTitle = "Success";
    this.modal.show();
    const data = this.userService.saveProject(scenarioData).subscribe((rep: any) => {
      this.modelMsg = rep.message;
      if(rep.status==1){
        this.scenarioSaved=true;
        this.isSavedScenario=true;
      }else {
        if(rep.status==205){
          this.modelTitle = "Alert";
        }
        this.isSavedScenario=false;
      }
     // this.modal.show();
    });

  }
  successOk() {
    this.modal.hide();
    if(this.isSavedScenario)
     this.router.navigate(['dashboard']);
  }
  testU(data) {

    let referenceArray = [];
    var tempHtml = "";
    if(data.ref) {
      if (Object.keys(data.ref).length !== 0) {
        let refs = data.ref;
        for (let rs in refs) {
          referenceArray.push(refs[rs]);
        }
      }
    }
    if (data.range.ref) {
      if (Object.keys(data.range.ref).length !== 0) {
        let refr = data.range.ref;
        var rrHtml = "";
        for (let rr in refr) {
          referenceArray.push(refr[rr]);
        }
      }
    }
    if (data.ref) {
      if (Object.keys(data.ref).length == 0 && Object.keys(data.range.ref).length == 0) {
        tempHtml = 'No references';
      }
    }

    //  console.log(data.hasOwnProperty("ref"));
    if (data.ref !== null) {
      if (typeof (data.ref) === 'object') {
        if (referenceArray.length !== 0) {
          this.newHtml = "<h6><b>Ref:</b></h6>" + referenceArray.join("<hr>");
        } else {
          this.newHtml = "No references";
        }
      } else if (typeof (data.ref) === 'string') {
          this.newHtml = data.ref;
        }
    } else {
      this.newHtml = 'No references';
    }
      if (data.range.ref !== null) {
        if (typeof (data.range.ref) === 'string') {
          this.rangeHTML = data.range.ref;
        }
      } else {
          this.rangeHTML = 'No references';
        }
    if (data.info) {
        this.infoHTML = data.info;
      } else {
        this.infoHTML = 'No Info';
      }
  }
}
