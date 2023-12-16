import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClientsComponent } from './clients.component';
import { Client } from '../model/Customer.model';
import { of } from 'rxjs';
import { ClientService } from '../services/client.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: jasmine.SpyObj<ClientService>;
  let router: Router;

  beforeEach(async () => {
    clientService = jasmine.createSpyObj('ClientService', ['getClients', 'deleteCustomer']); // Corrected method name
    
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ClientService, useValue: clientService }
      ],
    }).compileComponents();

    // Create the component instance and fixture
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject the Router service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get clients on init', fakeAsync(() => {
    const mockClients: Client[] = [
      {
        idCl: 1,
        CodeCl: 'clt2',
        nomCl: 'maissa',
        prenomCl: 'ellouze',
        adresseCl: 'sfax',
        emailCl: 'maissa@gmail.com',
        numeroTelCl: '29',
        actif: true,
      }
    ];
    clientService.getClients.and.returnValue(of(mockClients));

    component.ngOnInit();
    tick();

    expect(component.clients).toEqual(mockClients);
    expect(component.originalClients).toEqual(mockClients);
  }));

  it('should delete a customer', fakeAsync(() => {
    const clientIdToDelete = 1;
    const mockClients: Client[] = [
      {
        idCl: 1,
        CodeCl: 'clt2',
        nomCl: 'maissa',
        prenomCl: 'ellouze',
        adresseCl: 'sfax',
        emailCl: 'maissa@gmail.com',
        numeroTelCl: '29',
        actif: true,
      }
    ];
    clientService.getClients.and.returnValue(of(mockClients));
    clientService.deleteCustomer.and.returnValue(of({} as Object)); // Corrected method name

    component.ngOnInit();
    tick();

    component.handleDeleteCustomer(clientIdToDelete);
    tick();

    expect(component.clients.length).toBe(0); // Assuming the client with id 1 is deleted
    expect(clientService.deleteCustomer).toHaveBeenCalledWith(clientIdToDelete);
  }));

  it('should navigate to edit page', () => {
    const clientIdToEdit = 1;
    spyOn(router, 'navigate');  // Spy on the router navigate method

    component.navigateToEdit(clientIdToEdit);

    expect(router.navigate).toHaveBeenCalledWith(['/clients/update', clientIdToEdit]);
  });

  it('should apply filter when searchFilter is set', () => {
    const mockClients: Client[] = [
      {
        idCl: 1,
        CodeCl: 'clt2',
        nomCl: 'maissa',
        prenomCl: 'ellouze',
        adresseCl: 'sfax',
        emailCl: 'maissa@gmail.com',
        numeroTelCl: '29',
        actif: true,
      },
      {
        idCl: 2,
  CodeCl: 'clt',
  nomCl: 'morched',
  prenomCl: 'adennadher',
  adresseCl: 'sfax',
  emailCl: 'morched@gmail.com',
  numeroTelCl: '55',
  actif: true,
      },
    ];

    component.originalClients = mockClients;

    // Set search filter
    component.searchFilter = 'morched';
    component.applyFilter();

    // Expect the filtered list to contain only the matching client
    expect(component.clients.length).toBe(1);
    expect(component.clients[0].nomCl).toBe('morched');
  });

  it('should restore the original list when searchFilter is empty', () => {
    const mockClients: Client[] = [
      {
        idCl: 1,
        CodeCl: 'clt2',
        nomCl: 'maissa',
        prenomCl: 'ellouze',
        adresseCl: 'sfax',
        emailCl: 'maissa@gmail.com',
        numeroTelCl: '29',
        actif: true,
      },
      {
        idCl: 2,
  CodeCl: 'clt',
  nomCl: 'morched',
  prenomCl: 'adennadher',
  adresseCl: 'sfax',
  emailCl: 'morched@gmail.com',
  numeroTelCl: '55',
  actif: true,
      },
    ];

    component.originalClients = mockClients;
    component.clients = mockClients; // Simulate a filtered list

    // Clear search filter
    component.searchFilter = '';
    component.applyFilter();

    // Expect the original list to be restored
    expect(component.clients).toEqual(mockClients);
  });
});
