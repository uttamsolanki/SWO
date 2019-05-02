import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import {BaseChartDirective} from 'ng2-charts';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  constructor(private userService: UserService, private router: Router,  private route: ActivatedRoute) { }

  @ViewChild('tabset') tabset: TabsetComponent;
  @ViewChild('baseChart') public chart: BaseChartDirective;
  @ViewChild('piChart') public piChart: BaseChartDirective;
  @ViewChild('successModal') public modal: ModalDirective;

  fields: any = ['primary', 'secondary', 'sec_clr', 'tertiary', 'disinfection', 'biosolid', 'biogas', 'biosolids_disposals', 'dewatering', 'chemical', 'process'];

  modelMsg;
  co2_eq = 135.5;
  COD_TOC = 3.33;
  COD_TOC_PER_MOL = 32;
  Removed_TKN = 0.34;
  gamma = 0.140;
  delta = 8.422;
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
    data: {title: '0', default: 0, co2: 0, suggested: 0},
  };

  process = {
    active_sludge: {
      co2: 0,
      no2: 0,
      totalCo2: 0,
      CODin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      TKNin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODout: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      TKNout: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      FLOWwas: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODwas: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      TKNwas: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      COD_BOD5: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      WAS_COD_VSS: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      COD_BOD5out: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      }
    },
    aerobic: {
      plantinfluent: null,
      co2: 0,
      ch4: 0,
      totalCo2: 0,
      Qin: 0,
      FLOWin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODout: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODred: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      }
    },
    anarobic: {
      plantinfluent: '1',
      isOrganic: 1,
      isBiosolids: 1,
      isFlaring: 1,
      co2: 0,
      ch4: 0,
      Qin: 0,
      totalCo2: 0,
      FLOWin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODout: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODred: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      alpha: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
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
      FLOWin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      CODin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      carbon_methane: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      alpha: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
    },
    transporation: {
      plantinfluent: '1',
      totalCo2: 0,
      Qin: 0,
      travel_type: 'distance',
      FLOWin: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      distance: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      },
      time: {
        title: null,
        unit: null,
        default: 0,
        suggested: 0,
      }
    },
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
    totalCo2: 0
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
    {data: [65, 59, 80, 81, 56, 55, 40, 21], label: 'CO2 Equivalent from Electricity Emissions'}
  ];


  // *************  stackChart Start *************//

  public stackChart1Colours: Array<any> = [
    {
      //backgroundColor: 'rgba(102,178,255,.3)',
      borderWidth: 0
    }
  ];
  public stackChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: 'rgba(148,159,177,0.2)',
    scales: {
      xAxes: [{

        categoryPercentage: 1.0,
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

  public stackChartLabels: string[] = ['Activated Sludge', 'Aerobic Digester', 'Anarobic Digester', 'Total'];
  public stackChartType = 'bar';
  public stackChartLegend = true;

  public stackChartData: any[] = [
     {
      label: 'CO2 Emission',
      data: [67.8,12,16],
      backgroundColor: '#0B59BD' // green
    },
    {
      label: 'N2O Emission',
      data: [20.7,18,20],
      backgroundColor: '#ED7D31' // yellow
    },
    {
      label: 'CH4 Emission',
      data: [11.4,22,24],
      backgroundColor: '#A5A5A5' // red
    }
  ];

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartOptions: any = {
    title: {
      display: true,
      text: 'CO2 Equivalent Emissions by Category',
      fontSize: 14
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'black',
        fontSize : 12
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, piChart) => {
        piChart.dataset.backgroundColor=["#FEFF00", "#FF98FF",'#6F319F','#02B0F0','#C55A11'];
          let sum = 0;
          let dataArr = piChart.dataset.data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";

          return percentage;
        },
        display: function(context) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
        },
        color: '#000',
        font:{
          size:16
        }
      }
    }
  };
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
    this.chemicalData(data.chemical);
    this.processData(data.process);
    this.createChart();
  }
  assignEditFormValue(editData) {
    if (editData.scenario) {
      this.projecName = editData.name;
      const fielddData = editData.scenario[0].data;
      for (const field of this.fields) {
        this[field] = fielddData[field];
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
      }
        this.selectTreatmentType('', 'sec_clr', this.sec_clr_types);
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
    this.active_sludgeData.Qwas = this.active_sludgeData.Qin * this.process.active_sludge.FLOWwas.default / 100;
    this.active_sludgeData.Qout = this.active_sludgeData.Qin - this.active_sludgeData.Qwas;
    this.calcActiveCo2();
  }
  calcActiveCo2() {
    const c1 = this.active_sludgeData.Qin * this.process.active_sludge.CODin.default - this.active_sludgeData.Qout * this.process.active_sludge.CODout.default - this.active_sludgeData.Qwas * this.process.active_sludge.CODwas.default;
    const calCo2 = (c1 / this.COD_TOC) * (44 / 12) * (1 / 1000);
    this.active_sludgeData.co2 = parseFloat(calCo2.toFixed(2));

    const n1 = this.active_sludgeData.Qin * this.process.active_sludge.TKNin.default - this.active_sludgeData.Qout * this.process.active_sludge.TKNout.default - this.active_sludgeData.Qwas * this.process.active_sludge.TKNwas.default;
    const calNo2 = (n1 * this.Removed_TKN * 0.01) * (1 / 1000) * 296;
    this.active_sludgeData.no2 = parseFloat(calNo2.toFixed(2));

    this.active_sludgeData.totalCo2 = this.active_sludgeData.co2 + this.active_sludgeData.no2;
    this.active_sludgeData.totalCo2 = parseFloat(this.active_sludgeData.totalCo2.toFixed(2));
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
    this.aerobicData.Qout = this.aerobicData.Qin;
    this.calcAerobicCo2();
  }
  calcAerobicCo2() {
    const c1 = this.aerobicData.Qin * this.process.aerobic.CODin.default - this.aerobicData.Qout * this.process.aerobic.CODout.default;
    const calCo2 = (c1 / this.COD_TOC) * (44 / 12) * (1 / 1000);

    this.aerobicData.co2 =  parseFloat(calCo2.toFixed(2));
    this.aerobicData.ch4 = 0;
    this.aerobicData.totalCo2 = parseFloat(this.aerobicData.co2.toFixed(2));

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
      this.anarobicData.Qap = this.process.anarobic.FLOWin.default * this.size.data.default / 100;
    } else {
      if (this.process.anarobic.Qin !== undefined) {
      this.anarobicData.Qin = this.process.anarobic.Qin;
      }
    }

    this.anarobicData.Qin = this.anarobicData.Qap;
    this.anarobicData.CODLod = (this.anarobicData.Qap * this.process.anarobic.CODin.default) / 1000;

    if (this.process.anarobic.isOrganic == 1) {
      this.anarobicData.Qin = this.anarobicData.Qin + this.process.organics.flow;
      this.anarobicData.CODLod = this.anarobicData.CODLod + (this.process.organics.flow * this.process.organics.COD / 1000);
    }

    if (this.process.anarobic.isBiosolids == 1) {
      this.anarobicData.Qin = this.anarobicData.Qin + this.process.biosolids.flow;
      this.anarobicData.CODLod = this.anarobicData.CODLod + (this.process.biosolids.flow * this.process.biosolids.COD / 1000);
    }

    if (this.anarobicData.Qin) {
      this.anarobicData.CODin = (this.anarobicData.CODLod / this.anarobicData.Qin) * 1000;
    } else {
      this.anarobicData.CODin = 0;
    }
    this.anarobicData.CODin = parseFloat(this.anarobicData.CODin.toFixed(2));
    this.anarobicData.Qout = this.anarobicData.Qin;
    this.calcAnarobicCo2();
  }
  calcAnarobicCo2() {
    const temp = (this.anarobicData.Qin * this.anarobicData.CODin - this.anarobicData.Qout * this.process.anarobic.CODout.default) / this.COD_TOC_PER_MOL;
    const alpha = this.process.anarobic.alpha.default / 100;
    const calCo2 = temp * (1 - alpha) * 0.044;
    this.anarobicData.co2 = parseFloat(calCo2.toFixed(2));
    let calCh4 = 0;
    if (this.process.anarobic.isFlaring == 1) {
      calCh4 = temp * alpha * 0.044;
      this.anarobicData.ch4 = parseFloat(calCh4.toFixed(2));
      this.anarobicData.co2  = this.anarobicData.co2 + this.anarobicData.ch4;
      this.anarobicData.ch4 = 0;
    } else {
      calCh4 = temp * alpha * 0.016 * 23;
      this.anarobicData.ch4 = parseFloat(calCh4.toFixed(2));
    }

    this.anarobicData.totalCo2 = this.anarobicData.co2 + this.anarobicData.ch4;
    this.anarobicData.totalCo2 = parseFloat( this.anarobicData.totalCo2.toFixed(2));
    if (this.biosolid.anaerobic.sel_type !== '0') {
      this.process.anarobic.co2 = this.anarobicData.co2;
      this.process.anarobic.ch4 = this.anarobicData.ch4;
      this.process.anarobic.totalCo2 = this.anarobicData.totalCo2;
    } else {
      this.process.anarobic.co2 = 0;
      this.process.anarobic.ch4 = 0;
      this.process.anarobic.totalCo2 = 0;
    }

    this.UpdateProcessValue();
  }
  calDisposalFlow() {
    if (this.process.disposal.plantinfluent == '1') {
      this.disposalData.Qin = this.process.disposal.FLOWin.default * this.size.data.default / 100;
    } else {
      if (this.process.disposal.Qin !== undefined) {
      this.disposalData.Qin = this.process.disposal.Qin;
      }
    }
    this.calDisposalCo2();
  }
  calDisposalCo2() {
    const c1 = this.disposalData.Qin * this.process.disposal.CODin.default;
    const alpha = this.process.disposal.alpha.default / 100;
    const calCo2 = (c1 / this.COD_TOC_PER_MOL) * (1 - alpha) * (44 / 1000);
    this.disposalData.co2 =  parseFloat(calCo2.toFixed(2));

    const calCh4 = (c1 / this.COD_TOC_PER_MOL) * alpha * (16 / 1000) * 23;
    this.disposalData.ch4 = parseFloat(calCh4.toFixed(2));

    this.disposalData.totalCo2 = this.disposalData.co2 + this.disposalData.ch4;
    this.disposalData.totalCo2 = parseFloat(this.disposalData.totalCo2.toFixed(2));
    if (this.biosolids_disposals.disposal.sel_type !== 'Landfill without Methane Recovery') {
      this.disposalData.totalCo2 = 0;
      this.disposalData.ch4 = 0;
      this.disposalData.co2 = 0;
    }
    this.process.disposal.co2 = this.disposalData.co2;
    this.process.disposal.ch4 = this.disposalData.ch4;
    this.process.disposal.totalCo2 =  this.disposalData.totalCo2;
    this.UpdateProcessValue();
  }
  calTransporationFlow() {
    if (this.process.transporation.plantinfluent == '1') {
      this.transporationData.Qin = this.process.transporation.FLOWin.default * this.size.data.default / 100;
    } else {
      if (this.process.transporation.Qin !== undefined) {
        this.transporationData.Qin = this.process.transporation.Qin;
      }
    }
    this.calTransporationCo2();
  }
  calTransporationCo2() {
    if (this.process.transporation.travel_type === 'time') {
      const calCo2 = this.transporationData.Qin  * this.process.transporation.time.default * this.delta;
      this.process.transporation.totalCo2 = parseFloat(calCo2.toFixed(2));
    }

    if (this.process.transporation.travel_type === 'distance') {
      const calCo2 = this.transporationData.Qin  * this.process.transporation.distance.default * this.gamma;
      this.process.transporation.totalCo2 = parseFloat(calCo2.toFixed(2));
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
         this.barChartLabels.push(this.primary.pumping.data.title);
         newData.push(this.primary.pumping.data.co2);
         this.totalElecricalCo2 += JSON.parse(this.primary.pumping.data.co2);
     }

    if (this.primary.prili_treat.sel_type !== '0') {
      this.barChartLabels.push(this.primary.prili_treat.data.title);
      newData.push(this.primary.prili_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.prili_treat.data.co2);
    }

    if (this.primary.pri_treat.sel_type !== '0') {
      this.barChartLabels.push(this.primary.pri_treat.data.title);
      newData.push(this.primary.pri_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.pri_treat.data.co2);
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
      this.totalElecricalCo2 += JSON.parse(this.biosolid.aerobic.data.co2);
      this.totalOnSiteCo2 = this.totalOnSiteCo2 + this.process.aerobic.totalCo2;
    }
    if (this.biosolid.thickener.sel_type !== '0') {
      this.barChartLabels.push(this.biosolid.thickener.data.title);
      newData.push(this.biosolid.thickener.data.co2);
       this.totalElecricalCo2 += JSON.parse(this.biosolid.thickener.data.co2);
    }
    if (this.biosolid.anaerobic.sel_type !== '0') {
      this.barChartLabels.push(this.biosolid.anaerobic.data.title);
      newData.push(this.biosolid.anaerobic.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.biosolid.anaerobic.data.co2);
      this.totalOnSiteCo2 = this.totalOnSiteCo2 + this.process.anarobic.totalCo2;
    }
    if (this.dewatering.sel_type !== '0') {
      this.barChartLabels.push(this.dewatering.data.title);
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
      newData.push(this.totalEnergyCo2);
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
      newData[i] = newData[i] / this.unitDivider;
    }

    this.SummaryReport();

    this.barChartData = [
      {data: newData, label: 'CO2 Equivalent from Electricity Emissions'}
    ];
    // this.pieChartLabels = [];
    // this.pieChartData = [];
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
    this.pieChartData = [this.totalElecricalCo2 , this.totalChemicalCo2, this.totalTransportationCo2, this.totalOnSiteCo2, this.totalDisposalCo2];
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
    data.co2 = calculation.toFixed(2);
    return data;
  }

  ChemicalCo2Calcaltion(data) {
    const calculation = (data.default * data.co2_eq * this.size.data.default ) / 1000;
    data.co2 = calculation.toFixed(2);
    return data;
  }

  changeUnit() {
    if (!this.unit) {
      this.unitDivider = this.size.data.default / 1000;
    } else {
      this.unitDivider = 1;
    }

    this.createChart();
  }

  SummaryReport() {
    this.ElecricalCo2 = parseFloat((this.totalElecricalCo2 / this.unitDivider).toFixed(2));
    this.OnSiteCo2 = parseFloat((this.totalOnSiteCo2 / this.unitDivider).toFixed(2));
    this.ChemicalCo2 = parseFloat((this.totalChemicalCo2 / this.unitDivider).toFixed(2));
    this.DisposalCo2 = parseFloat((this.totalDisposalCo2 / this.unitDivider).toFixed(2));
    this.EnergyCo2 = parseFloat((this.totalEnergyCo2 / this.unitDivider).toFixed(2));
    this.TransportationCo2 = parseFloat((this.totalTransportationCo2 / this.unitDivider).toFixed(2));
    this.EqCo2  = parseFloat((this.ElecricalCo2 + this.OnSiteCo2 + this.ChemicalCo2 + this.DisposalCo2 + this.EnergyCo2 + this.TransportationCo2).toFixed(2));


    this.active_sludgeco2 = parseFloat((this.process.active_sludge.co2 / this.unitDivider).toFixed(2));
    this.aerobicco2 = parseFloat((this.process.aerobic.co2 / this.unitDivider).toFixed(2));
    this.anarobicco2 = parseFloat((this.process.anarobic.co2 / this.unitDivider).toFixed(2));
    this.disposalco2 = parseFloat((this.process.disposal.co2 / this.unitDivider).toFixed(2));

    this.active_sludgeno2 = parseFloat((this.process.active_sludge.no2 / this.unitDivider).toFixed(2));

    this.aerobicch4 = parseFloat((this.process.aerobic.ch4 / this.unitDivider).toFixed(2));
    this.anarobicch4 = parseFloat((this.process.anarobic.ch4 / this.unitDivider).toFixed(2));
    this.disposalch4 = parseFloat((this.process.disposal.ch4 / this.unitDivider).toFixed(2));

    this.active_sludgetotalCo2 = parseFloat((this.process.active_sludge.totalCo2 / this.unitDivider).toFixed(2));
    this.aerobictotalCo2 = parseFloat((this.process.aerobic.totalCo2 / this.unitDivider).toFixed(2));
    this.anarobictotalCo2 = parseFloat((this.process.anarobic.totalCo2 / this.unitDivider).toFixed(2));
    this.disposaltotalCo2 = parseFloat((this.process.disposal.totalCo2 / this.unitDivider).toFixed(2));
    this.transporationtotalCo2  = parseFloat((this.process.transporation.totalCo2 / this.unitDivider).toFixed(2));

    this.ProcessCo2 = parseFloat((this.active_sludgetotalCo2 + this.aerobictotalCo2 + this.anarobictotalCo2 + this.disposaltotalCo2 + this.transporationtotalCo2).toFixed(2));

  this.stackChartData= [
      {
        label: 'CO2 Emission',
        data: [this.active_sludgeco2,this.aerobicco2,this.anarobicco2,JSON.parse((this.active_sludgeco2+this.aerobicco2+this.anarobicco2).toFixed(2))],
        backgroundColor: '#0B59BD' // green
      },
      {
        label: 'N2O Emission',
        data: [this.active_sludgeno2,0,0,this.active_sludgeno2],
        backgroundColor: '#ED7D31' // yellow
      },
      {
        label: 'CH4 Emission',
        data: [0,this.aerobicch4,this.anarobicch4, JSON.parse((this.aerobicch4+ this.anarobicch4).toFixed(2))],
        backgroundColor: '#A5A5A5' // red
      }
    ];

  }
  // *************  Common Function  End *************//


  goto(id) {
    this.tabset.tabs[id].active = true;
  }

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

    this.process.aerobic.Qin = this.aerobicData.Qin;
    this.process.anarobic.Qin = this.aerobicData.Qin;
    this.process.disposal.Qin = this.disposalData.Qin;
    this.process.transporation.Qin = this.transporationData.Qin;

    for (const field of this.fields) {
      this.result[field] = this[field];
    }
    test = this.result;

    const projectData = {projectName: this.projecName, data: test, project_id: null};
    if (this.id) {
      projectData.project_id = this.id;
    }

    this.modelMsg = "Wait.....";
    this.modal.show();
    const data = this.userService.saveProject(projectData).subscribe((rep: any) => {
      this.modelMsg = rep.message;
     // this.modal.show();
    });

  }
  successOk() {
    this.modal.hide();
     this.router.navigate(['dashboard']);
  }

}
