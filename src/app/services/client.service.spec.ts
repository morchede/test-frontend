import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClientService } from './client.service';
import { environment } from '../../environnements/environment';
import { Client } from '../model/Customer.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpTestingController: HttpTestingController;
  const mockUpdatedClient: any = {
    // Updated client data, modify as needed
    nomCl: 'maissa',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });

    service = TestBed.inject(ClientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a customer', () => {
    const customerId = 1;
    service.deleteCustomer(customerId).subscribe();

    const req = httpTestingController.expectOne(`${environment.backendHost}delete/${customerId}`);
    expect(req.request.method).toBe('DELETE');

   
  });

  it('should get clients', () => {
    const mockClients: Client[] = [
      {
        idCl: 1,
        CodeCl: 'C001',
        nomCl: 'John',
        prenomCl: 'Doe',
        adresseCl: '123 Main St',
        emailCl: 'john.doe@example.com',
        numeroTelCl: '555-1234',
        actif: true,
      },
      // Add more mock clients as needed
    ];
    service.getClients().subscribe((clients: Client[]) => {
      expect(clients).toEqual(mockClients);  // Check if the returned clients match the mockClients
    });

    const req = httpTestingController.expectOne(`${environment.backendHost}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockClients, { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' } });

  });

  it('should add a client', () => {
    const mockClient: Client = { 
      idCl: 1,
  CodeCl: 'clt',
  nomCl: 'morched',
  prenomCl: 'adennadher',
  adresseCl: 'sfax',
  emailCl: 'morched@gmail.com',
  numeroTelCl: '55',
  actif: true, };

    service.addClient(mockClient).subscribe();

    const req = httpTestingController.expectOne('http://localhost:8080/clients/add');
    expect(req.request.method).toBe('POST');
    // You may want to add more assertions based on your application's logic

    // You can provide a mock response if needed
    // req.flush(mockResponse);
  });
  it('should update a client', () => {
    const customerId = 1;

    service.updateClient(customerId, mockUpdatedClient).subscribe();

    const url = `${service['apiUrl']}/clients/update/${customerId}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdatedClient);  // Check if the request body matches the mockUpdatedClient

    // You can provide a mock response if needed
    // req.flush(mockResponse);
  });

  it('should get a client by ID', () => {
    const clientId = 1;
    const mockClient: Client = {
      idCl: clientId,
      CodeCl: 'clt2',
      nomCl: 'maissa',
      prenomCl: 'ellouze',
      adresseCl: 'sfax',
      emailCl: 'maissa@gmail.com',
      numeroTelCl: '29',
      actif: true, 
    };

    service.getClientById(clientId).subscribe((client: Client) => {
      expect(client).toEqual(mockClient);  // Check if the returned client matches the mockClient
    });

    const url = `http://localhost:8080/clients/${clientId}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    // Provide a mock response
    req.flush(mockClient);
  });

  it('should search clients', () => {
    const keyword = 'John';
    const mockClients: Client[] = [
      {
        idCl: 1,
        CodeCl: 'clt',
  nomCl: 'morched',
  prenomCl: 'adennadher',
  adresseCl: 'sfax',
  emailCl: 'morched@gmail.com',
  numeroTelCl: '55',
  actif: true, 
      },
      // Add more mock clients as needed
    ];

    service.searchClients(keyword).subscribe((clients: Client[]) => {
      expect(clients).toEqual(mockClients);  // Check if the returned clients match the mockClients
    });

    const searchUrl = `${environment.backendHost}/clients/search?keyword=${keyword}`;
    const req = httpTestingController.expectOne(searchUrl);
    expect(req.request.method).toBe('GET');

    // Provide a mock response
    req.flush(mockClients);
  });
});
