import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client } from '../model/Customer.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-ajout',
  templateUrl: './client-ajout.component.html',
  styleUrls: ['./client-ajout.component.css']
})
export class ClientAjoutComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  client: Client = {
    idCl: 0,
    CodeCl: '',
    nomCl: '',
    prenomCl: '',
    adresseCl: '',
    emailCl: '',
    numeroTelCl: '',
    actif: false
  };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}
  

  openModal() {
    this.display = "block";
  }

  closeModal() {
    this.display = "none";
  }

  ajoutarticle() {
    this.clientService.addClient(this.client).subscribe(data => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
    
  }
}
