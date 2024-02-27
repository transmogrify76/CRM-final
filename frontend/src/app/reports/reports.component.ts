import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Customer {
  customer_id: number;
  name: string;
  address: string;
  email: string;
  visiting_date: string;
  prospect_status: string;
  outcome: string;
  employee: string;
}


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  userName: string = '';
  authToken:any;
  userdata: Customer[] = [];

  ngOnInit() {
    this.showData();
  }

  constructor(private router: Router , private authenticationService : AuthenticationService) { }

  redirectToViewPage(customer_id: number){
    this.router.navigateByUrl(`/view-page/${customer_id}`);
  }
  redirectTofollowpage(){
    this.router.navigate(['/follow-up'])
  }
  redirectToeditpage(customer_id: number){
    this.router.navigateByUrl(`/edit/${customer_id}`);
  }

  showData(){
    this.authToken = sessionStorage.getItem('authToken');
    console.log('========>' , this.authToken);    
    this.authenticationService.allData(this.authToken as string).subscribe((data : Customer[]) =>{
      this.userdata = data;
    })
  }
  

  downloadAllToPDF() {
    const doc = new jsPDF.default();

    // Define the table data and columns
    const tableData: any[][] = [];
    const columns = ['Sl. No.', 'Customer Name', 'Address', 'Employee Name', 'Response', 'Visit Time & Date', 'Prospect Status'];

    // Populate table data from userdata
    this.userdata.forEach((user, index) => {
      const rowData = [
        index + 1,
        user.name,
        user.address,
        user.employee,
        user.outcome,
        user.visiting_date,
        user.prospect_status
      ];
      tableData.push(rowData);
    });

    // Add autoTable plugin and create the table
    (doc as any).autoTable({
      head: [columns],
      body: tableData
    });

    // Save the PDF
    doc.save('all_data.pdf');
  }
}
  

