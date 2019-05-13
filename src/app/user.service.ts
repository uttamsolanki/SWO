import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {AppConstants} from './AppConstants';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  _headers : any;
  _baseURL : string;
  constructor(private _http: HttpClient) {
    this._headers = new HttpHeaders({'Content-Type':'application/json','No-Auth':'True'});
    this._baseURL = AppConstants.baseURL;
  }

  SignIn(user){
    console.log('Sign in call');
    return this._http.post(this._baseURL+'users/signin', user,{headers:this._headers});
  }

  SignUp(user){
    return this._http.post(this._baseURL+'users/signup', user,{headers:this._headers});
  }

  forgotPassword(user){
    return this._http.post(this._baseURL+'users/forgotPassword', user,{headers:this._headers});
  }


  getUser(){
    return this._http.get(this._baseURL+'users/profile', {headers:this._headers});
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  isLoggednIn() {
    return this.getToken() !== null;
  };

  getData(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return this._http.get('assets/dataDummy.json', {headers: this._headers});
  }

  saveProject(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/save', data,{headers: this._headers});
  }

  getProject(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/get',{headers: this._headers});
  }

  getProjectDatils(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/details',data,{headers: this._headers});
  }

  saveSenario(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/', data,{headers: this._headers});
  }

}
