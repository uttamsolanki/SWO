import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {ActivatedRoute} from '@angular/router';
import {DataServiceService} from '../../data-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private  userService: UserService, private route: ActivatedRoute, private dataServiceService: DataServiceService) {
  }

  projects: any = [];
  numberOfProject: number;
  iconCollapse: string = 'icon-arrow-up';
  private sub: any;
  id: string;
  primary: any;
  secondary: any;
  sec_clr: any;
  tertiary: any;
  disinfection: any;
  biosolid: any;
  biogas: any;
  biosolids_disposals: any;
  dewatering: any;
  chemical: any;
  process: any;
  size:any;
  unit = 1;
  scenarioname;
  fields: any = ['primary', 'secondary', 'sec_clr', 'tertiary', 'disinfection', 'biosolid', 'biogas', 'biosolids_disposals', 'dewatering',
    'chemical', 'process', 'size'];
  scenarios: any = [];
  processEmission: { co2, no2, totalCo2 };
  totalElecricalCo2 = 0;
  totalChemicalCo2 = 0;
  totalBiolidDisposalCo2 = 0;
  noOfcolumn: number = 0;
  selectedProject: string = '0';
  selectScenario: any = [];
  allScenario: any = [];
  isDisable: boolean = false;
  count: number = 0;
  senarioIds;
  scenariosData;
  unitDivider = 1;
  projectName: '';
  projectCreateDate: '';
  // *************  barChart Start *************//
  showContent: boolean = true;
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
    this.senarioIds = this.dataServiceService.getScenarioId();
    const data = this.userService.getProject().subscribe((rep: any) => {
      if (rep.status === 1) {
        this.numberOfProject = Object.keys(rep.data).length;
        if (this.numberOfProject > 0) {
          this.projects = rep.data;
        }

        this.id = this.route.snapshot.paramMap.get('id') || null;
        if (this.id !== null) {
          this.selectedProject = this.id;
          this.getProjectProject(this.id);
        }

      } else {
        console.log(rep.status);
      }

    });

    if (this.senarioIds!==undefined) {
      this.checkCheckbox();
    }
  }

  changeProject() {
    this.count = 0;
    this.selectScenario = [];
    this.allScenario = [];
    if (this.selectedProject !== '')
      this.getProjectProject(this.selectedProject);
  }

  selectSenario() {
    this.count = 0;

    for (let s of this.allScenario) {
      if (this.selectScenario[s])
        this.count++;
    }

    this.noOfcolumn = Math.floor(12 / (this.count + 1));

    if (this.count > 3) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }

  }

  getProjectProject(p_id) {
    this.scenarios = [];
    const details = this.userService.getProjectDatils({project_id: p_id}).subscribe((resp: any) => {
      this.projectName = resp.data.name;
      this.projectCreateDate = resp.data.created_date;
      this.setSenarioData(resp);
      if (resp.status === 1) {
        if (resp.data.scenario) {
          for (let s of resp.data.scenario) {
           // this.scenarioname = s.name['scenarioname'];
            let scenarioData = s.data;
            for (const field of this.fields) {
              this[field] = scenarioData[field];
            }
            this.createChart(s._id,s.name);
            this.allScenario.push(s._id);
          }
        }
      }
      this.selectSenario();
    });

  }

  setSenarioData(resp) {
    this.scenariosData = resp.data.scenario;
    this.scenarioname =[];
     for (let s of resp.data.scenario) {
       if(s.name) {
         this.scenarioname.push(s.name);
       }
     }
  }


  createChart(id, name){

    const processEmission = {co2: 0, no2: 0, totalCo2: 0, ch4: 0};
    const graphData = { size:0, electical: 0, OnProcess: 0, process: 0, disposal: 0, disposalData: processEmission, energy: 0, chemical: 0, id: 0,
     transporation: 0, priorElectrical: 0, priorBiosolid: 0,  activeSludge: processEmission, anaerobic: processEmission, ProcessCo2: 0,
     aerobic: processEmission, co2Total: 0, no2Total: 0, ch4Totoal: 0, transporationData: processEmission, OnSiteCo2: 0, EnergyRecovery: 0,
      primaryPumping: 0, name: 'Scenario', priTreat: 0, primaryPrili: 0, secondaryTreat: 0, secClar: 0, tertiaryTreat: 0, EqCo2: 0,
      disinfectionTreat: 0, aerobicTreat: 0, thickenerTreat: 0, anaerobicTreat: 0, dewateringTreat: 0, biosolidnew: 0, ElecricalCo2: 0
    };

   // let selectedOption={
   //   pumping:'-',
   //   pri_treat:'-',
   //   prili_treat:'-',
   //   secondary:'-',
   //   sec_clr:'-',
   //   tertiary:'-',
   //   disinfection:'-',
   // }
   //this.isChart=true;
    //this.barChartLabels=[];
   // for (let s of this.scenariosData) {
      this.totalElecricalCo2 = 0;
      this.totalChemicalCo2 = 0;
      this.totalBiolidDisposalCo2 = 0;
      let newData = [];
      if (this.primary.pumping.sel_type !== '0') {
        // this.barChartLabels.push(this.primary.pumping.data.title);
        newData.push(this.primary.pumping.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.primary.pumping.data.co2);
        graphData.primaryPumping = this.primary.pumping.data.co2;
      } else {
        graphData.primaryPumping = 0;
      }
      if (this.primary.pri_treat.sel_type !== '0') {
        //this.barChartLabels.push(this.primary.pri_treat.data.title);
        newData.push(this.primary.pri_treat.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.primary.pri_treat.data.co2);
        graphData.priTreat = this.primary.pri_treat.data.co2;
      } else {
        graphData.priTreat = 0;
      }
      if (this.primary.prili_treat.sel_type !== '0') {
        //this.barChartLabels.push(this.primary.prili_treat.data.title);
        newData.push(this.primary.prili_treat.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.primary.prili_treat.data.co2);
        graphData.primaryPrili = this.primary.prili_treat.data.co2;
      } else {
        graphData.primaryPrili = 0;
      }
      if (this.secondary.sel_type !== '0') {
        //this.barChartLabels.push(this.secondary.data.title);
        newData.push(this.secondary.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.secondary.data.co2);
        graphData.secondaryTreat = this.secondary.data.co2;
      } else {
        graphData.secondaryTreat = 0;
      }
      if (this.sec_clr.sel_type !== '0') {
        //this.barChartLabels.push(this.sec_clr.data.title);
        newData.push(this.sec_clr.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.sec_clr.data.co2);
        graphData.secClar = this.sec_clr.data.co2;
      } else {
        graphData.secClar = 0;
      }
      if (this.tertiary.sel_type !== '0') {
        //this.barChartLabels.push(this.tertiary.data.title);
        graphData.tertiaryTreat =  this.tertiary.data.co2;
        newData.push(this.tertiary.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.tertiary.data.co2);
      } else {
        graphData.tertiaryTreat =  0;
      }
      if (this.disinfection.sel_type !== '0') {
        //this.barChartLabels.push(this.disinfection.data.title);
        graphData.disinfectionTreat  = this.disinfection.data.co2;
        newData.push(this.disinfection.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.disinfection.data.co2);
      } else {
        graphData.disinfectionTreat  = 0;
      }
      if (this.biosolid.aerobic.sel_type !== '0') {
        //this.barChartLabels.push(this.biosolid.aerobic.data.title);
        graphData.aerobicTreat = this.biosolid.aerobic.data.co2;
        newData.push(this.biosolid.aerobic.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.biosolid.aerobic.data.co2);
      } else {
        graphData.aerobicTreat = 0;
      }
      if (this.biosolid.thickener.sel_type !== '0') {
        //this.barChartLabels.push(this.biosolid.thickener.data.title);
        graphData.thickenerTreat = this.biosolid.thickener.data.co2;
        newData.push(this.biosolid.thickener.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.biosolid.thickener.data.co2);
      } else {
        graphData.thickenerTreat = 0;
      }
      if (this.biosolid.anaerobic.sel_type !== '0') {
        // this.barChartLabels.push(this.biosolid.anaerobic.data.title);
        graphData.anaerobicTreat = this.biosolid.anaerobic.data.co2;
        newData.push(this.biosolid.anaerobic.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.biosolid.anaerobic.data.co2);
      } else {
        graphData.anaerobicTreat = 0;
      }
      if (graphData.anaerobicTreat !== 0) {
        graphData.biosolidnew = graphData.anaerobicTreat;
      } else {
        graphData.biosolidnew = graphData.aerobicTreat;
      }
      if (this.dewatering.sel_type !== '0') {
        //this.barChartLabels.push(this.dewatering.data.title);
        graphData.dewateringTreat = this.dewatering.data.co2;
        newData.push(this.dewatering.data.co2);
        this.totalElecricalCo2 += JSON.parse(this.dewatering.data.co2);
      } else {
        graphData.dewateringTreat = 0;
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
      if (this.biogas.sel_type !== '0') {
        graphData.EnergyRecovery = this.biogas.data.co2;
      } else {
        graphData.EnergyRecovery = 0;
      }
      if (this.biogas.sel_type === 'Energy Recovery') {
        graphData.electical = this.biogas.data.co2;
      }
      // this.barChartData = [
      //   {data: newData, label: 'CO2 Equalvalent from Electricity Emissions'}
      // ];
      // this.chart.datasets = this.barChartData;
      // this.chart.labels = this.barChartLabels;
      // this.chart.ngOnInit();
      graphData.electical = this.totalElecricalCo2;
      graphData.transporation = this.process.transporation.totalCo2;
      graphData.OnProcess = this.process.aerobic.totalCo2 + this.process.anarobic.totalCo2 + this.process.active_sludge.totalCo2;
      graphData.chemical = this.totalChemicalCo2 / this.unitDivider;
      graphData.priorElectrical = graphData.electical + graphData.transporation + graphData.OnProcess + graphData.chemical;
      graphData.ElecricalCo2 = parseFloat((this.totalElecricalCo2 / this.unitDivider).toFixed(2));

      graphData.priorBiosolid = graphData.priorElectrical - graphData.electical;
      graphData.disposal = this.process.disposal.totalCo2;
      graphData.disposalData = this.setProcessData(this.process.disposal);
      graphData.process = graphData.priorBiosolid + graphData.disposal;
      graphData.id = id;
      graphData.transporationData = this.setProcessData(this.process.transporation);
      graphData.name = name;
      graphData.activeSludge = this.setProcessData(this.process.active_sludge);
      graphData.aerobic = this.setProcessData(this.process.aerobic);
      graphData.anaerobic = this.setProcessData(this.process.anarobic);

    graphData.ProcessCo2 = parseFloat((this.process.active_sludge.totalCo2 + this.process.aerobic.totalCo2 +
        this.process.anarobic.totalCo2 + this.process.disposal.totalCo2 + this.process.transporation.totalCo2).toFixed(2));
    graphData.OnSiteCo2 = parseFloat((graphData.ProcessCo2 / this.unitDivider).toFixed(2));
   // this.OnSiteCo2 = parseFloat((graphData.ProcessCo2 / this.unitDivider).toFixed(2));

    graphData.size=this.size.data.default;

    this.scenarios.push(graphData);
  }

  // set process data to make json for graphData and push that into the this.scenarios
  setProcessData(data) {
    const processEmission = {co2: 0, no2: 0, totalCo2: 0, ch4: 0};
    processEmission.co2 = data ? (data.co2 ? data.co2 : 0) : 0;
    processEmission.no2 = data ? (data.no2 ? data.no2 : 0) : 0;
    processEmission.ch4 = data ? (data.ch4 ? data.ch4 : 0) : 0;
    processEmission.totalCo2 = data ? (data.totalCo2 ? data.totalCo2 : 0) : 0;
    return processEmission;
  }
  checkCheckbox() {
    for (let id of this.senarioIds) {
      this.selectScenario.push(id);
      this.selectScenario[id] = true;
    }
  }
  changeUnit() {
    if (this.unit === 0) {
      this.unitDivider = this.size.data.default / 1000;
    } else if (this.unit === 1) {
      this.unitDivider = 1;
    } else if (this.unit === 2) {
      this.unitDivider = 1000 / 365;
    }
  }
}
