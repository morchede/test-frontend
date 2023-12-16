import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientAjoutComponent } from './client-ajout/client-ajout.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:"clients",component:ClientsComponent},
  { path: 'clients/update/:id', component: ClientEditComponent },
  { path: 'app-client-ajout', component: ClientAjoutComponent },
  { path: 'app-client-detail/:id', component: ClientDetailComponent },

{path:'login',component:LoginComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
