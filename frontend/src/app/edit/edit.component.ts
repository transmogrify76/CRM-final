import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  update: FormGroup; // Declare the 'update' property of type FormGroup
  customer_id: number | null = null;
  customer: any = {};

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private fb: FormBuilder) {
      this.update = this.fb.group({ // Initialize the 'update' FormGroup
        customername: [''],
        customeraddress:[''],
        visiting_date:[''],
        outcome:[''],
        prospectstatus:[''],
        employee:['']
      });
    }

  ngOnInit(): void {
    this.customer_id = Number(this.activatedRoute.snapshot.paramMap.get("customer_id"));
    console.log(this.customer_id);

    if (this.customer_id === null) {
      this.router.navigateByUrl('/');
    } else {
      this.getCustomerById(this.customer_id);
    }
  }

  getCustomerById(customer_id: number): void {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      this.authService.getCustomerById(customer_id, authToken).subscribe(
        (response: any) => {
          console.log({ response });
          this.customer = response;
          // Populate form with retrieved customer data
          this.update.patchValue({
            customername: response['name'], 
            customeraddress: response['address'],
            visiting_date: response['visiting_date'],
            outcome: response['outcome'],
            prospectstatus: response['prospect_status'],
            employee: response['employee']
          });
        },
        (error: any) => {
          console.log({ error });
          this.router.navigateByUrl('/');
        }
      );
    } else {
      this.router.navigateByUrl("/reports");
    }
  }

  onUpdate(): void {
    // Extract form values using ngModel
    const data = {
      name: this.customer.name,
      address: this.customer.address,
      email: this.customer.email,
      employee: this.customer.employee,
      outcome: this.customer.outcome,
      response: this.customer.response,
      visiting_date: this.customer.visiting_date,
      prospect_status: this.customer.prospect_status
    };
    
    console.log(data);

  const authToken = sessionStorage.getItem('authToken');
  if (!authToken) {
    console.error('Auth token not found. Unable to update customer data.');
    this.router.navigateByUrl('/reports');
    return;
  }

  if (!this.customer_id) {
    console.error('Customer ID is null. Unable to update customer data.');
    this.router.navigateByUrl('/reports');
    return;
  }

  this.authService.updateCustomer(this.customer_id, authToken, data).subscribe(
    (response: any) => {
      console.log('Customer data updated successfully:', response);
      this.router.navigateByUrl('/reports');
      alert('Data updated successfully');
    },
    (error: any) => {
      console.error('Error updating customer data:', error);
      this.router.navigateByUrl('/reports');
    }
  );
}
}