import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {AlertModule, CollapseModule, ModalModule, PopoverModule} from 'ngx-bootstrap';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ChartsModule } from 'ng2-charts';
import {UserService} from './user.service';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import { AlertComponent } from './alert/alert.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReportComponent } from './report/report.component';
import { CreateComponent } from './report/create/create.component';
import { ViewComponent } from './report/view/view.component';
import { BarChartComponent } from './report/bar-chart/bar-chart.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { MasterDataComponent } from './admin/master-data/master-data.component';
import { ReferenceComponent } from './admin/reference/reference.component';
import { ProjectComponent } from './report/project/project.component';
import { NewProjectComponent } from './report/new-project/new-project.component';
import { InformationComponent } from './report/information/information.component';
import { OverviewComponent } from './overview/overview.component';
import {ConfirmationGuard} from './confirmGaurd/confirmation.guard';
import { UsersComponent } from './report/users/users.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CeilPipe } from './ceil.pipe';

import {QuillModule} from 'ngx-quill';
import { ProfilesComponent } from './profiles/profiles.component';
import { EditComponent } from './profiles/edit/edit.component';
import { ShowComponent } from './profiles/show/show.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    PopoverModule,
    PopoverModule.forRoot(),
    CollapseModule,
    QuillModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ReportComponent,
    CreateComponent,
    ViewComponent,
    BarChartComponent,
    DashboardComponent,
    AdminComponent,
    MasterDataComponent,
    ReferenceComponent,
    ProjectComponent,
    NewProjectComponent,
    InformationComponent,
    OverviewComponent,
    UsersComponent,
    AdminPanelComponent,
    CeilPipe,
    ProfilesComponent,
    EditComponent,
    ShowComponent,
   // ScenarioDetailsComponent,
  ],
  providers: [UserService, ConfirmationGuard, AuthGuard,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }, {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
