import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  alertsDismiss: any = [];
  dismissible = true;
  employeeForm: FormGroup;
  formErrors = {
    'password':'',
    'confirmPassword':'',
    'resetToken':''
  };
  validationsMessages = {
    'password': {
      'required': 'New password is required'
    },
    'confirmPassword':{
      'required': 'Confim password is required'
    },
    'resetToken':{
      'required': 'Confim password is required'
    }
  };

  constructor(private fb: FormBuilder, private UserService: UserService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      resetToken:['', Validators.required]
    });
    const token = this.route.snapshot.paramMap.get('token');
    this.employeeForm.patchValue({
      resetToken:token,
    });

    this.employeeForm.valueChanges.subscribe((res: string) => {
      this.logKeyValuePair(this.employeeForm);
    });
  }

  onSubmit(): void {

    if (this.employeeForm.valid) {
      this.UserService.resetPassword(this.employeeForm.value).subscribe((res: any) => {
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
          this.router.navigate(['/login']);
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
