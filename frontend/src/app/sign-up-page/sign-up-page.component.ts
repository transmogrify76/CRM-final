import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { RegistrationData } from '../sign-up-page/registration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    public router:Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registerData() {
    if (this.registrationForm.valid) {
      const userData: RegistrationData = this.registrationForm.value;
      console.log('Registering user:', userData);

      this.authService.register(userData).subscribe(response =>{
        console.log('Registration response:', response);
        this.router.navigate(['/login']);
      });
    } else {
      console.error('Invalid form data. Please check the form.');
    }
  }
}
