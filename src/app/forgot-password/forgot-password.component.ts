import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  alertsDismiss: any = [];
  dismissible = true;
  employeeForm: FormGroup;
  formErrors = {
    'email': ''
  };
  validationsMessages = {
    'email': {
      'required': 'Email is required'
    }
  };

  constructor(private fb: FormBuilder, private UserService: UserService, private router:Router) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      email: ['', Validators.required]
    });

    this.employeeForm.valueChanges.subscribe((res: string) => {
      this.logKeyValuePair(this.employeeForm);
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.UserService.forgotPassword(this.employeeForm.value).subscribe((res: any) => {
      console.log(res)
        if(res.status ==0){
          this.alertsDismiss.push({
            type: 'danger',
            msg: res.errors==null ? res.message: res.errors,
            timeout: 5000
          });
        } else{
          this.alertsDismiss.push({
            type: 'success',
            msg: res.message,
            timeout: 5000
          });
          //this.router.navigate(['/dashboard']);
        }
      }, (error: HttpErrorResponse) => {
        if(error.status<=0) {
          this.alertsDismiss.push({
            type: 'danger',
            msg: "Internet connection error",
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
