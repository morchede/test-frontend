import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../model/Customer.model';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
  clients: Client[] = [];
  selectedClient: Client;
  display: string;
  originalClients: Client[] = [];
  searchFilter: string = '';
  filterAdresse: string = '';
  filterNumeroTel: string = '';
  totalRevenue: number;
  nnPayee: boolean;
  
  clientHasUnpaidInvoices: boolean[] = [];
    constructor(private clientService: ClientService,private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit is called');
    this.getClients();
    
    
  }

  getClients() {
    this.clientService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.originalClients = [...this.clients];
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients : ', error);
      }
    );
  }
  handleDeleteCustomer(clientId: number ){
    let conf=confirm("are you sure ");
    if (!conf) return ;
    this.clientService.deleteCustomer(clientId).subscribe(() => {
      
      this.clients = this.clients.filter(client => client.idCl !== clientId);
      console.log('Post deleted successfully!');
    });
    
  }

  
  
  navigateToEdit(clientId: number): void {
    console.log(clientId)
    let conf=confirm("are you sure to update client ");
    if (!conf) return ;
    this.router.navigate(['/clients/update', clientId]); // '/clients/edit' est l'URL configurée pour le composant ClientEditComponent
  }
  
  applyFilter() {
    if (this.searchFilter || this.filterAdresse || this.filterNumeroTel) {
      // Si des filtres sont appliqués, utilisez la copie filtrée
      this.clients = this.originalClients.filter(client =>
        client.nomCl.toLowerCase().includes(this.searchFilter) &&
        client.adresseCl.toLowerCase().includes(this.filterAdresse) &&
        client.numeroTelCl.toLowerCase().includes(this.filterNumeroTel)
      );
    } else {
      // Si aucun filtre, restaurez la liste originale
      this.clients = [...this.originalClients];
    }
  }

  filter(event: Event, filterType: string): void {
    switch (filterType) {
      case 'nomCl':
        this.searchFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
        break;
      case 'adresseCl':
        this.filterAdresse = (event.target as HTMLInputElement).value.trim().toLowerCase();
        break;
      case 'numeroTelCl':
        this.filterNumeroTel = (event.target as HTMLInputElement).value.trim().toLowerCase();
        break;
      // Ajoutez d'autres cas si nécessaire
    }
  
    this.applyFilter();
  }


  navigateToClientDetail(clientId: number): void {
    console.log("detailll",clientId)   
     // Utilisez le service de routage pour naviguer vers app-client-detail avec l'ID du client
    this.router.navigate(['/app-client-detail', clientId]);
    this.display = "block";
  }

  getTotalRevenueForClient(clientId: number): void {
    this.clientService.getTotalRevenueForClient(1).subscribe(
      (result) => {
        this.totalRevenue = result;
        console.log(`Total revenue for client ${clientId}: ${this.totalRevenue}`);
  
      
      }

      
     
    );
  }
  hasUnpaidInvoices(clientId: number): void {
    this.clientService.hasUnpaidInvoices(clientId).subscribe(
      (result: boolean) => {
        // Ensure the clientHasUnpaidInvoices array is initialized with `false` values
        while (this.clientHasUnpaidInvoices.length <= clientId) {
          this.clientHasUnpaidInvoices.push(false);
        }
  
        // Update the value for the specific client
        this.clientHasUnpaidInvoices[clientId] = result;
        console.log(`Does client ${clientId} have unpaid invoices? ${this.clientHasUnpaidInvoices[clientId]}`);
      },
      (error) => {
        console.error('Error checking for unpaid invoices:', error);
        // Handle the error as needed
      }
    );
  }
  
  getHasUnpaidInvoices(clientId: number): boolean {
    return this.clientHasUnpaidInvoices[clientId];
  }
  
}
