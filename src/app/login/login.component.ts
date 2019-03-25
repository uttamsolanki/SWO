import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {errorObject} from 'rxjs/internal-compatibility';
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  alertsDismiss: any = [];
  dismissible = true;
  employeeForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationsMessages = {
    'email': {
      'required': 'Email is required'
    },
    'password': {
      'required': 'Password is required'
    }
  };

  constructor(private fb: FormBuilder, private UserService: UserService, private router:Router) { }

  ngOnInit() {
    if(this.UserService.isLoggednIn()) {
     // console.log('Uttan')
     this.router.navigateByUrl('/dashboard');
    }
    this.employeeForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.employeeForm.valueChanges.subscribe((res: string) => {
      this.logKeyValuePair(this.employeeForm);
    });

  }
  onSubmit(): void {

    if (this.employeeForm.valid) {
      this.UserService.SignIn(this.employeeForm.value).subscribe((res: any) => {
        console.log(res);
        if(res.status ==0){
          this.alertsDismiss.push({
            type: 'danger',
            msg: res.errors,
            timeout: 5000
          });
          console.log(res.errors);
        } else{
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('currentUser', JSON.stringify(res.data.user));
          this.alertsDismiss.push({
            type: 'success',
            msg: res.message,
            timeout: 5000
          });
          this.router.navigate(['/dashboard']);
        }
      }, (error: HttpErrorResponse) => {
           if(error.status<=0) {
             this.alertsDismiss.push({
               type: 'danger',
               msg: 'Internet connection error',
               timeout: 5000,
             });
           } else if(error instanceof Object){
             this.alertsDismiss.push({
               type: 'danger',
               msg: error.error.details[0].message.replace(/"/g, ' '),
               timeout: 5000,
             });
          }
      });
    } else {
      this.logKeyValuePair(this.employeeForm);
    }

  }

  logKeyValuePair(group: FormGroup ): void {
    Object.keys(group.controls).forEach((key: string) => {

      const abstractcontrol = group.get(key);
      if (abstractcontrol instanceof FormGroup) {
        this.logKeyValuePair(abstractcontrol);
      } else {
        this.formErrors[key] = '';
        if (abstractcontrol && !abstractcontrol.valid  ) {

          const messages =  this.validationsMessages[key];
          for (const error in abstractcontrol.errors) {
            if (error) {
              this.formErrors[key] += messages[error] + ' ';
            }
          }
        }

      }
    });
  }

}
