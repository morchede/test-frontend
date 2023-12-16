import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientAjoutComponent } from './client-ajout/client-ajout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { LoginComponent } from './auth/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientAjoutComponent,
    ClientEditComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
