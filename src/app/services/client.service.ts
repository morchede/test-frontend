import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Client } from '../model/Customer.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environnements/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080';


  // Inside ClientService class
constructor(private http: HttpClient) {
  console.log('Backend Host:', environment.backendHost);
}


  
  public deleteCustomer(id :Number){
    console.log(id);
    return this.http.delete(environment.backendHost+"delete/"+id);
    
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.backendHost}`);
  }
  
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>('http://localhost:8080/clients/add', client);
  }
  
  updateClient(customerId: number, updatedClient: any): Observable<any> {
    const url = `${this.apiUrl}/clients/update/${customerId}`;

    return this.http.put(url, updatedClient)
      
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    throw error;
  }





  getClientById(clientId: number): Observable<Client> {
    const url = `http://localhost:8080/clients/${clientId}`;
    return this.http.get<Client>(url);
  }

  deleteClient(id: number): Observable<Object> {
    console.log(id);
    const url = `${environment.backendHost}delete/${id}`;
  
    return this.http.delete(url);
  }
  

  

  searchClients(keyword: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.backendHost}/clients/search?keyword=${keyword}`);
  }

  getTotalRevenueForClient(clientId: number): Observable<number> {
    return this.http.get<number>(`${environment.backendHost}${clientId}/getTotalRevenue`);
  }

  getRemainingAmountForClient(clientId: number): Observable<number> {
    console.log("RemainingAmount",clientId)
    return this.http.get<number>(`${environment.backendHost}${clientId}/getRemainingAmount`);
  }

  getPaymentsStatusForAllClients(): Observable<Object[]> {
    return this.http.get<Object[]>(`${environment.backendHost}/clients/paymentsClients`);
  }
  getRevenueByClientAndYear(clientId: number, year: string): Observable<Object[]> {
    return this.http.get<Object[]>(`${environment.backendHost}${clientId}/revenue/${year}`);
  }
  hasUnpaidInvoices(clientId: number): Observable<boolean> {
    console.log("hiiii",clientId)
    return this.http.get<boolean>(`${environment.backendHost}${clientId}/hasUnpaidInvoices`);
  }
  

  getRevenueByYear(year: string): Observable<Object[]> {
    return this.http.get<Object[]>(`${environment.backendHost}/clients/revenue/${year}`);
  }

  public imprimercustomer(){
    console.log(environment.backendHost+"imprimer");
    
    return this.http.get(environment.backendHost+"imprimer", { responseType: 'blob' });
  }
}

