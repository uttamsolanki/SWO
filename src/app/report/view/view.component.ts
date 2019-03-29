import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private  userService: UserService, private route: ActivatedRoute) { }

  projects:any = [];
  numberOfProject:number;
  iconCollapse: string = 'icon-arrow-up';
  private sub: any;
  id: string;
  primary:any;
  secondary:any;
  sec_clr:any;
  tertiary:any;
  disinfection:any;
  biosolid:any;
  biogas:any;
  biosolids_disposals:any;
  dewatering:any;
  chemical:any;
  process:any;
  fields:any = ['primary', 'secondary', 'sec_clr', 'tertiary', 'disinfection', 'biosolid', 'biogas', 'biosolids_disposals', 'dewatering','chemical','process'];
  scenarios:any=[];
  totalElecricalCo2 = 0;
  totalChemicalCo2 = 0;
  totalBiolidDisposalCo2=0;
  noOfcolumn:number=0;
  selectedProject:string='0';
  selectScenario:any=[];
  allScenario:any=[];
  isDisable:boolean=false;
  count:number=0;
  // *************  barChart Start *************//
  showContent:boolean=true;
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
    const data = this.userService.getProject().subscribe((rep: any) => {
      if(rep.status === 1) {
        this.numberOfProject = Object.keys(rep.data).length;
        if (this.numberOfProject > 0) {
          this.projects = rep.data;
        }

        this.id = this.route.snapshot.paramMap.get('id') || null;
        if(this.id!==null){
          this.selectedProject = this.id;
          this.getProjectProject(this.id);
        }

      } else {
        console.log(rep.status);
      }

    });
  }
  changeProject(){
    this.count=0;
    this.selectScenario=[];
    this.allScenario=[];
    if(this.selectedProject!=='')
     this.getProjectProject(this.selectedProject);
  }
  selectSenario(){
    this.count=0;
    for(let s of this.allScenario){
      if(this.selectScenario[s])
        this.count++;
    }
    this.noOfcolumn = 12 / (this.count + 1);
    if(this.count>2){
      this.isDisable=true;
    }else{
      this.isDisable=false;
    }
  }
  getProjectProject(p_id){
    this.scenarios=[];
    const details = this.userService.getProjectDatils({project_id: p_id}).subscribe((resp: any) => {
      if (resp.status === 1) {
        if (resp.data.scenario) {
          for (let s of resp.data.scenario ){

            let scenarioData = s.data;

            for (const field of this.fields) {
              this[field] = scenarioData[field];
            }
            this.createChart(s._id);
            this.allScenario.push(s._id);
          }
        }
      }
    });

  }

  createChart(id){
   let graphData = {electical:0, process: 0, disposal: 0, energy: 0, chemical: 0, transporation: 0,id:0};
    //this.isChart=true;
    //this.barChartLabels=[];
    this.totalElecricalCo2=0;
    this.totalChemicalCo2 = 0;
    this.totalBiolidDisposalCo2=0;
    let newData = [];
    if(this.primary.pumping.sel_type !== '0'){
     // this.barChartLabels.push(this.primary.pumping.data.title);
      newData.push(this.primary.pumping.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.pumping.data.co2);
    }
    if(this.primary.pri_treat.sel_type !== '0'){
      //this.barChartLabels.push(this.primary.pri_treat.data.title);
      newData.push(this.primary.pri_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.pri_treat.data.co2);
    }
    if(this.primary.prili_treat.sel_type !== '0'){
      //this.barChartLabels.push(this.primary.prili_treat.data.title);
      newData.push(this.primary.prili_treat.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.primary.prili_treat.data.co2);
    }
    if(this.secondary.sel_type !== '0'){
      //this.barChartLabels.push(this.secondary.data.title);
      newData.push(this.secondary.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.secondary.data.co2);
    }
    if(this.sec_clr.sel_type !== '0'){
      //this.barChartLabels.push(this.sec_clr.data.title);
      newData.push(this.sec_clr.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.sec_clr.data.co2);
    }
    if(this.tertiary.sel_type !== '0'){
      //this.barChartLabels.push(this.tertiary.data.title);
      newData.push(this.tertiary.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.tertiary.data.co2);
    }
    if(this.disinfection.sel_type !== '0'){
      //this.barChartLabels.push(this.disinfection.data.title);
      newData.push(this.disinfection.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.disinfection.data.co2);
    }
    if(this.biosolid.aerobic.sel_type !== '0'){
      //this.barChartLabels.push(this.biosolid.aerobic.data.title);
      newData.push(this.biosolid.aerobic.data.co2);
       this.totalElecricalCo2 += JSON.parse(this.biosolid.aerobic.data.co2);
    }
    if(this.biosolid.thickener.sel_type !== '0'){
      //this.barChartLabels.push(this.biosolid.thickener.data.title);
      newData.push(this.biosolid.thickener.data.co2);
      this.totalElecricalCo2 += JSON.parse(this.biosolid.thickener.data.co2);
    }
    if(this.biosolid.anaerobic.sel_type !== '0'){
     // this.barChartLabels.push(this.biosolid.anaerobic.data.title);
      newData.push(this.biosolid.anaerobic.data.co2);
       this.totalElecricalCo2 += JSON.parse(this.biosolid.anaerobic.data.co2);
    }
    if(this.dewatering.sel_type !== '0'){
      //this.barChartLabels.push(this.dewatering.data.title);
      newData.push(this.dewatering.data.co2);
       this.totalElecricalCo2 += JSON.parse(this.dewatering.data.co2);
    }
    if(this.chemical.metal_salts.sel_type !== '0'){
      this.totalChemicalCo2 += JSON.parse(this.chemical.metal_salts.data.co2);
    }
    if(this.chemical.chlorination.sel_type !== '0'){
      this.totalChemicalCo2 += JSON.parse(this.chemical.chlorination.data.co2);
    }
    if(this.chemical.dechlorination.sel_type !== '0'){
      this.totalChemicalCo2 += JSON.parse(this.chemical.dechlorination.data.co2);
    }
    console.log(this.process.disposal);
    // this.barChartData = [
    //   {data: newData, label: 'CO2 Equalvalent from Electricity Emissions'}
    // ];
    // this.chart.datasets = this.barChartData;
    // this.chart.labels = this.barChartLabels;
    // this.chart.ngOnInit();
    graphData.transporation = this.process.transporation.totalCo2;
    graphData.disposal = this.process.disposal.totalCo2;
    graphData.process = this.process.aerobic.totalCo2 + this.process.anarobic.totalCo2 + this.process.active_sludge.totalCo2;
    graphData.chemical = this.totalChemicalCo2;
    graphData.electical = this.totalElecricalCo2;
    graphData.id = id;
    this.scenarios.push(graphData);
    console.log(this.scenarios);

  }
}
