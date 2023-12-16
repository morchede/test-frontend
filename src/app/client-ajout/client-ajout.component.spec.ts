import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClientAjoutComponent } from './client-ajout.component';
import { ClientService } from '../services/client.service';
import { Client } from '../model/Customer.model';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ClientAjoutComponent', () => {
  let component: ClientAjoutComponent;
  let fixture: ComponentFixture<ClientAjoutComponent>;
  let clientService: jasmine.SpyObj<ClientService>;

  beforeEach(() => {
    clientService = jasmine.createSpyObj('ClientService', ['addClient']);

    TestBed.configureTestingModule({
      declarations: [ClientAjoutComponent],
      providers: [
        { provide: ClientService, useValue: clientService },
      ],
      imports: [FormsModule], // Import FormsModule
    });

    fixture = TestBed.createComponent(ClientAjoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.openModal();
    expect(component.display).toBe('block');
  });

  it('should close modal', () => {
    component.closeModal();
    expect(component.display).toBe('none');
  });

  it('should add a client and reload the page', fakeAsync(() => {
    const mockClient: Client = {
      idCl: 2,
      CodeCl: 'clt',
      nomCl: 'morched',
      prenomCl: 'adennadher',
      adresseCl: 'sfax',
      emailCl: 'morched@gmail.com',
      numeroTelCl: '55',
      actif: true,
    };

    clientService.addClient.and.returnValue(of(mockClient));

    component.client = mockClient;
    component.ajoutarticle();
    tick();

    expect(clientService.addClient).toHaveBeenCalledWith(mockClient);
    expect(component.display).toBe('none');
  }));
});
