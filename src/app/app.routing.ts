import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';

import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ViewComponent} from './report/view/view.component';
import {CreateComponent} from './report/create/create.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {MasterDataComponent} from './admin/master-data/master-data.component';
import {reference} from '@angular/core/src/render3';
import {ReferenceComponent} from './admin/reference/reference.component';
import {ProjectComponent} from './report/project/project.component';
import {NewProjectComponent} from './report/new-project/new-project.component';
import {OverviewComponent} from './overview/overview.component';
import {ConfirmationGuard} from './confirmGaurd/confirmation.guard';
import {UsersComponent} from './report/users/users.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';

export const routes: Routes = [
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      { path: '',  redirectTo: 'dashboard' , pathMatch: 'full'},
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'overview',
        component: OverviewComponent,
        data: {
          title: 'Overview'
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        children: [
          { path: '',  redirectTo: 'view' , pathMatch: 'full'},
          { path: 'view', component: ViewComponent  },
          { path: 'view/:id', component: ViewComponent  },
          // { path: 'create', component: CreateComponent},
          {path: 'create/:id', component: CreateComponent, canDeactivate: [ConfirmationGuard]},
          { path: 'create/:id/:sid', component: CreateComponent, canDeactivate: [ConfirmationGuard]},
          { path: 'create/:id/:sid/:length/', component: CreateComponent, canDeactivate: [ConfirmationGuard]},
          { path: 'create/:id/:sid/:length/:viewFlag', component: CreateComponent, canDeactivate: [ConfirmationGuard]},
         // { path: 'create/:id/:length', component: CreateComponent},
          {path: 'project', component: ProjectComponent},
          {path: 'project/:id', component: ProjectComponent},
          {path: 'new-project', component: NewProjectComponent},
          {path: 'users', component: UsersComponent}
          ]
      },
      {
        path: 'admin-panel',
        component: AdminPanelComponent,
        data: {
          title: 'Admin'
        }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: {
          title: 'view'
        },
        children: [
          { path: '',  redirectTo: 'update' , pathMatch: 'full'},
          { path: 'update', component: MasterDataComponent , data: { title: 'Update master' } },
          { path: 'reference', component: ReferenceComponent , data: { title: 'Add/Edit Reference' } },
        ]
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
