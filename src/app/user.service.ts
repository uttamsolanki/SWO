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
    this._headers = new HttpHeaders({'Content-Type':'application/json','No-Auth':'True'});
    this._baseURL = AppConstants.baseURL;
    return this._http.post(this._baseURL+'users/signin', user,{headers:this._headers});
  }

  SignUp(user){
    this._headers = new HttpHeaders({'Content-Type':'application/json','No-Auth':'True'});
    this._baseURL = AppConstants.baseURL;
    return this._http.post(this._baseURL+'users/signup', user,{headers:this._headers});
  }

  forgotPassword(user){
    this._headers = new HttpHeaders({'Content-Type':'application/json','No-Auth':'True'});
    this._baseURL = AppConstants.baseURL;
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

  getUserList(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return this._http.get(this._baseURL + 'users/list', {headers: this._headers});
  }
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
  getScenarioDatils(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/ScenarioDetails',data,{headers: this._headers});
  }
  getScenario(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/details', data,{headers: this._headers});
  }
  saveSenario(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/', data,{headers: this._headers});
  }
  deleteSenario(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/DeleteScenario', data,{headers: this._headers});
  }
  deleteProject(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/delete', data,{headers: this._headers});
  }
  saveNewProject(data): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.post(this._baseURL + 'projects/saveProject', data,{headers: this._headers});
  }

  getPrimaryData(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.get(this._baseURL +'primary/get', {headers: this._headers});
  }
  getProcessData(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.get(this._baseURL +'process', {headers: this._headers});
  }
  getProcessAllData(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.get(this._baseURL +'process/getAll', {headers: this._headers});
  }
  getPrimaryAllData(): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.get(this._baseURL +'primary/getAll', {headers: this._headers});
  }
  saveAdminData(data, adminid): Observable<any> {
    this._headers = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'False'});
    return  this._http.put( this._baseURL +`master/${adminid}`, data,{headers: this._headers});
  }
}
