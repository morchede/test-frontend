import { Component } from '@angular/core';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use styleUrls instead of styleUrl
})
export class AppComponent {
  title = 'projetFront';

  constructor(private clientService: ClientService) {} // Add this constructor

  imprimercustomer() {
    this.clientService.imprimercustomer().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      },
      (error) => {
        console.error('Erreur lors de l\'appel à imprimercustomer : ', error);
      }
    );
  }
}
