import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  alertsDismiss: any = [];
  dismissible = true;
  employeeEditForm: FormGroup;
  @ViewChild('successModal',{static: true}) public modal: ModalDirective;
  formErrors={
    'first_name': '',
    'last_name': '',
    'company_name': '',
     'email': ''
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
  }

  constructor(private fb: FormBuilder,private userService: UserService, private router:Router) {
  }

  ngOnInit() {
    this.employeeEditForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      company_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      //email: ['uttam@fmail.com'],
       email: ['', Validators.required],
    });

    this.employeeEditForm.valueChanges.subscribe((res: string) => {
      // this.logKeyValuePair(this.employeeForm);
    });

    const data = this.userService.getUser().subscribe((response: any) => {
      if(response.user){
        const user=response.user;
        this.employeeEditForm.patchValue({
          first_name:user.first_name,
          last_name:user.last_name,
          company_name:user.company_name,
          email:user.email
        });
      }
    });
  }


  onSubmit(): void {

    if (this.employeeEditForm.valid) {
      this.userService.saveProfile(this.employeeEditForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.status == 0) {
          this.alertsDismiss.push({
            type: 'danger',
            msg: res.errors==null ?res.message:res.errors,
            timeout: 5000
          });
        }else{
          this.alertsDismiss.push({
            type: 'success',
            msg: res.message,
            timeout: 5000
          });
          localStorage.setItem('currentUser', JSON.stringify(res.data));
        }
      });
    }else{
      this.logKeyValuePair(this.employeeEditForm);
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
