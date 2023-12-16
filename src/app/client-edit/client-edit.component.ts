// client-edit.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../model/Customer.model';
import { ClientService } from '../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
openModal() {
throw new Error('Method not implemented.');
}
  @ViewChild('myModal') myModal!: ElementRef;
  display = "block";
  client: Client = new Client();
  clientId: number;
  errorMessage: string;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.fetchClientDetails(this.clientId);
    });
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

  updateClient(): void {
    
    this.clientService.updateClient(this.clientId, this.client)
      .subscribe(
        (response) => {
          console.log('Updated Client:', response);
        },
        (error) => {
          console.error('Error updating client:', error);
        }
      );
      let confsucc=confirm("  client updated successfully ");
      this.router.navigate(['/clients']);
  }
 
  closeModal(): void {
    // Navigate to the 'clients' route when the modal is closed
    this.router.navigate(['/clients']);
  }

  goBack(): void {
    this.router.navigate(['/clients', this.clientId]);
  }
}
