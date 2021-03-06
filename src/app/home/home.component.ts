import {Component, OnInit, Inject, OnDestroy, ViewChild} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../_nav';
import {ModalDirective} from 'ngx-bootstrap';
import {AlertComponent} from '../alert/alert.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public loginUser:any='';
  year = new Date();
  // @ts-ignore
  constructor(@Inject(DOCUMENT) _document?: any, private router: Router ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  @ViewChild('overviewModal',{static: true}) public modal: ModalDirective;
  ngOnInit() {

    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      if(user.first_name !== undefined ){
        this.loginUser = user.first_name;
      }
      if(user.last_name !== undefined){
        this.loginUser += ' ' +user.last_name;
      }
      if(user.role_id==1){
        this.navItems.push({name: 'Users', url: '/report/users', icon: 'fa fa-eye'});
        this.navItems.push({name: 'Admin', url: '/admin-panel', icon: 'icon-pencil'});
      }
    }
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }

  OnDestroy(): void {
    this.changes.disconnect();
  }
}
