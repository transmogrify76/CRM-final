import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder , private authService:AuthenticationService , private router:Router){}

  loginForm!: FormGroup;
  submitted = false;

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  loginData() {
    if (this.loginForm.invalid) {
      return;
    } else{
      this.submitted = true;
    }
    const userData = {
      username: this.formControls['username'].value,
      password: this.formControls['password'].value
    };
    this.authService.login(userData).subscribe(response => {
      if (response.token) {
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('username', this.formControls['username'].value);
        this.router.navigate(['/reports']);
      } else {
        console.error('Errorr:', response);
        this.submitted = false;
      }
    }, error => {
      this.submitted = false;
    });
  }
  
}
