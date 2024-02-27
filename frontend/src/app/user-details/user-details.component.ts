import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  constructor(private formBuilder: FormBuilder , private authenticationService:AuthenticationService , private router : Router) {}

  //Public Variables
  register!:FormGroup
  submitted = false;
  authToken:string=''; 
  userName:string='';

  ngOnInit(){
    
    this.userName=sessionStorage.getItem('username') || '';
    
    this.register = this.formBuilder.group({
      name:['',Validators.required],
      address:['',Validators.required],
      email:['',Validators.required],
      employee:[this.userName,Validators.required],
      outcome:['',Validators.required],
      prospect_status:['',Validators.required],
      visiting_date:['',Validators.required]    
    })
    
  }

  onSubmit() {
    this.submitted = true;
    this.authToken = sessionStorage.getItem('authToken') || '';
    const payload = {
      name: this.register.value.name,
      address: this.register.value.address,
      email:this.register.value.email,
      employee: this.register.value.employee,
      outcome:this.register.value.outcome,
      response: this.register.value.response,
      visiting_date: this.register.value.visiting_date,
      prospect_status:this.register.value.prospect_status
    };
    
    this.authenticationService.addCustomer(this.authToken as string , payload).subscribe(data => {
      if(data || data.statusCode === 200){
        this.router.navigate(['/reports']);
      }
      else{
        this.submitted = false;
      }
    }, error => {
      console.error(error);
      this.submitted = false;
    });
  }
}
