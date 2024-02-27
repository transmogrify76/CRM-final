import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {
  customer_id: number | null = null;
  customer: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

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
        },
        (error: any) => {
          console.log({ error });
          this.router.navigateByUrl('/');
        }
      );
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  

  downloadPDF(): void {
    // Create a new jsPDF instance
    const doc = new jsPDF.default();
  
    // Define customer details
    const customerDetails = `
      Name: ${this.customer?.name}
      Email: ${this.customer?.email}
      Address: ${this.customer?.address}
      Visiting Date: ${this.customer?.visiting_date}
      Customer Response: ${this.customer?.outcome}
      Prospect Status: ${this.customer?.prospect_status}
      Employee Name: ${this.customer?.employee}
    `;
  
    // Add content to the PDF
    doc.text(customerDetails, 10, 10);
  
    // Save the PDF with a filename
    doc.save('customer_details.pdf');
  }
}  
