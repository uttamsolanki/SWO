import { Component, OnInit, Inject , OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../_nav';
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

  ngOnInit() {
  //  console.log(JSON.stringify(localStorage.getItem('token'))
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));

      if(user.first_name !== undefined ){
        this.loginUser = user.first_name;
      }
      if(user.last_name !== undefined){
        this.loginUser += ' ' +user.last_name;
      }
      console.log(this.loginUser);
    }
  }

  logout(){
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  OnDestroy(): void {
    this.changes.disconnect();
  }
}
