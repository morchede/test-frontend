import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ClientEditComponent } from './client-edit.component';
import { Client } from '../model/Customer.model';
import { ClientService } from '../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ClientEditComponent', () => {
  let component: ClientEditComponent;
  let fixture: ComponentFixture<ClientEditComponent>;
  let clientService: jasmine.SpyObj<ClientService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    clientService = jasmine.createSpyObj('ClientService', ['getClientById', 'updateClient']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ClientEditComponent],
      providers: [
        { provide: ClientService, useValue: clientService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ],
    });

    fixture = TestBed.createComponent(ClientEditComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch client details on init', fakeAsync(() => {
    const mockClient: Client = {
      idCl: 1,
      CodeCl: 'C001',
      nomCl: 'morched',
      prenomCl: 'abdennadher',
      adresseCl: 'sfax',
      emailCl: 'morched',
      numeroTelCl: '55',
      actif: true,
    };

    clientService.getClientById.and.returnValue(of(mockClient));

    component.ngOnInit();
    tick();

    expect(component.client).toEqual(mockClient);
  }));

  it('should update client', fakeAsync(() => {
    const mockClient: Client = {
      
        idCl: 1,
        CodeCl: 'clt2',
        nomCl: 'maissa',
        prenomCl: 'ellouze',
        adresseCl: 'sfax',
        emailCl: 'maissa@gmail.com',
        numeroTelCl: '29',
        actif: true,
      };

    clientService.updateClient.and.returnValue(of({}));

    component.client = mockClient;
    component.clientId = mockClient.idCl;

    component.updateClient();
    tick();

    expect(clientService.updateClient).toHaveBeenCalledWith(mockClient.idCl, mockClient);
  }));

  it('should close modal on closeModal', () => {
    component.closeModal();
    expect(router.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('should navigate back on goBack', () => {
    const clientId = 1;
    component.clientId = clientId;
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/clients', clientId]);
  });
});
