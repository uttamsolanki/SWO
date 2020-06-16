import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import {log} from 'util';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalDirective} from 'ngx-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  alertsDismiss: any = [];
  dismissible = true;
  employeeForm: FormGroup;
  @ViewChild('successModal',{static: true}) public modal: ModalDirective;
  formErrors={
    'first_name': '',
    'last_name': '',
    'company_name': '',
    'email': '',
    'password': '',
    'repeat_password': '',
    'agree_checkbox': ''
  }
  validationsMessages = {
    'first_name':{
      'required': 'Full name is required',
      'minlength': 'Full name must be greater then 2 character',
      'maxlength': 'Full name must be less then 30 character'
    },
    'last_name':{
      'required': 'Last name is required',
      'minlength': 'Last name must be greater then 2 character',
      'maxlength': 'Last name must be less then 30 character'
    },
    'company_name':{
      'required': 'Organization name is required',
      'minlength': 'Organization name must be greater then 2 character',
      'maxlength': 'Organization name must be less then 30 character'
    },
    'email':{
      'required': 'Email is required'
    },
    'password':{
      'required': 'Password is required'
    },
    'repeat_password':{
      'required': 'Repeat password is required'
    },
    'agree_checkbox': {
      'required': 'Please check the disclaimer checkbox'
    }
  }

  constructor(private fb: FormBuilder,private UserService: UserService, private router:Router) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      company_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      agree_checkbox: ['', Validators.required]
    });

    this.employeeForm.valueChanges.subscribe((res: string) => {
     // this.logKeyValuePair(this.employeeForm);
    });
  }

  onSubmit(): void {

    if (this.employeeForm.valid) {
      delete this.employeeForm.value['repeat_password'];
      delete this.employeeForm.value['agree_checkbox'];
      console.log(this.employeeForm.value);
      this.UserService.SignUp(this.employeeForm.value).subscribe((res: any) => {
        if(res.status ==0){
          this.alertsDismiss.push({
            type: 'danger',
            msg: res.errors,
            timeout: 5000
          });
        } else{
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('currentUser', JSON.stringify(res.data.user));
          this.alertsDismiss.push({
            type: 'success',
            msg: res.message,
            timeout: 5000
          });
          this.router.navigate(['/overview']);
        }
      }, (error: HttpErrorResponse) => {
        if(error.status<=0) {
          this.alertsDismiss.push({
            type: 'danger',
            msg: "Internet connection error",
            timeout: 5000,
          });
        } else if(error instanceof Object){

          if(error.error.status == 0){
            this.alertsDismiss.push({
              type: 'danger',
              msg: error.error.error,
              timeout: 5000,
            });
          }else{
            this.alertsDismiss.push({
              type: 'danger',
              msg: error.error.details[0].message.replace(/"/g, ' '),
              timeout: 5000,
            });
          }


        }
      });

    }else{
      this.logKeyValuePair(this.employeeForm);
    }
  };

  logKeyValuePair(group: FormGroup ): void{
      Object.keys(group.controls).forEach((key:string)=>{

        const abstractcontrol = group.get(key);
        if(abstractcontrol instanceof FormGroup){
          this.logKeyValuePair(abstractcontrol);
        }else{
          this.formErrors[key] = '';
          if(abstractcontrol && !abstractcontrol.valid){

            const messages =  this.validationsMessages[key];
            for (const error in abstractcontrol.errors){
              if(error)
                this.formErrors[key] += messages[error] + ' ';
            }
          }

        }
      });
    }
}
