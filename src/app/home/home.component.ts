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
  constructor(@Inject(DOCUMENT) _document?: any) {

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
  }

  logout(){
    //console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    //this.router.navigateByUrl('/login');
  }

  OnDestroy(): void {
    this.changes.disconnect();
  }
}
