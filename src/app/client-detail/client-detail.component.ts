import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../model/Customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent implements OnInit{

  
  @ViewChild('myModal') myModal!: ElementRef;
  display = "block";
  client: Client = new Client();
  clientId: number;
  errorMessage: string;
  totalRevenue: number;
  RemainingAmount: any;
  selectedYear: string = '--sélectionnée une Année';
  RevenueByClientAndYear: any;
  clientHasUnpaidInvoices: any;
  paied: boolean;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.fetchClientDetails(this.clientId);
      console.log("idddd", this.clientId);
      this.getTotalRevenueForClient(this.clientId);
     this.getRemainingAmountForClient(this.clientId);
     console.log("dateeee",this.selectedYear);
     this.tHasUnpaidInvoices(this.clientId);
    });
  }
  
  
  

  openModal() {
    this.display = "block";
  }

  closeModal() {
    this.display = "none";
  }

  fetchClientDetails(clientId: number): void {
    this.clientService.getClientById(clientId).subscribe(
      (data: Client) => {
        this.client = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  getTotalRevenueForClient(clientId: number): void {
    this.clientService.getTotalRevenueForClient(clientId).subscribe(
      (result) => {
        this.RevenueByClientAndYear = result;
        console.log(`Total revenue for client ${clientId}: ${this.RevenueByClientAndYear}`);
  
      
      }
     
    );
  }
  getRevenueByClientAndYear(clientId: number, selectedYear: string): void {
    if (selectedYear.toLowerCase() === 'tout') {
      // Call the method for total revenue
      this.getTotalRevenueForClient(clientId);
    } else {
      // Call the method for specific year
      this.clientService.getRevenueByClientAndYear(clientId, selectedYear).subscribe(
        (result) => {
          this.RevenueByClientAndYear = result;
  
          // Check if the array has elements
          if (Array.isArray(this.RevenueByClientAndYear) && this.RevenueByClientAndYear.length > 0) {
            // Retrieve the last element
            const dernierElement = this.RevenueByClientAndYear[this.RevenueByClientAndYear.length - 1];
  
            // Check if the last element is an array and has at least 3 elements
            if (Array.isArray(dernierElement) && dernierElement.length >= 3) {
              this.RevenueByClientAndYear = dernierElement[2];
              console.log(`Last value for client and year ${clientId}:`, this.RevenueByClientAndYear);
            } else {
              console.log(`The last element does not contain the expected value for client and year ${clientId}`);
            }
          } else {
            console.log(`No elements found for client and year ${clientId}`);
          }
        }
      );
    }
  }
  
  
  getRemainingAmountForClient(clientId: number): void {
    console.log("ser RemainingAmount", clientId)
  
    this.clientService.getRemainingAmountForClient(clientId).subscribe(
      (result) => {
        if (result !== null) {
          this.RemainingAmount = result;
          console.log(`getRemainingAmountForClient ${clientId}: ${this.RemainingAmount}`);
        } else {
          // Gérer le cas où le résultat est null
          console.log(`getRemainingAmountForClient ${clientId} is null.`);
          // Vous pouvez également choisir d'assigner une valeur par défaut à RemainingAmount, par exemple :
          // this.RemainingAmount = 0; // ou une autre valeur par défaut que vous préférez
        }
      },
      (error) => {
        // Gérer les erreurs de la requête
        console.error('Error fetching remaining amount:', error);
      }
    );
  }
  onYearChange() {
    // Appeler votre méthode de calcul avec la valeur sélectionnée
    console.log('Année sélectionnée :', this.selectedYear);

    // Appeler votre méthode de calcul ici
    this.getRevenueByClientAndYear(this.clientId,this.selectedYear);
  }



  tHasUnpaidInvoices(clientId: number): void {
    console.log("paieeed")
    this.clientService.hasUnpaidInvoices(clientId).subscribe(
      (result) => {
        this.paied = result;
        console.log(`paied ${clientId}: ${this.paied}`);
  
      
      }
     
    );
  }
}
