import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent {
  register!:FormGroup
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(){
    //validations
    this.register = this.formBuilder.group({
      visit:['',Validators.required],
      employeename:['',Validators.required],
      response:['',Validators.required]
    
    })
  }
  onSubmit() {
    this.submitted = true
    if(this.register.invalid){
      return
    }
    alert("success")
  }

}
