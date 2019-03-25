import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService}  from './../user.service'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService, private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLoggednIn()){
      return true;
    } else{
      this.myRoute.navigate(['login']);
      return false;
    }
  }
}
