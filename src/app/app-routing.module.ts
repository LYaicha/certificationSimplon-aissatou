import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { PersonnelComponent } from './auth/personnel/personnel.component';
import { UsersComponent } from './auth/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { AdminComponent } from './auth/admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ListePatientesAdminComponent } from './dashboard/liste-patientes-admin/liste-patientes-admin.component';
import { AjoutPersonelComponent } from './dashboard/ajout-personel/ajout-personel.component';
import { GestionContenuComponent } from './dashboard/gestion-contenu/gestion-contenu.component';
import { GestionPatientesComponent } from './DashPersonel/gestion-patientes/gestion-patientes.component';
import { GestionRVComponent } from './DashPersonel/gestion-rv/gestion-rv.component';
import { RessourcesComponent } from './DashPersonel/ressources/ressources.component';
import { MonCycleComponent } from './DashUser/mon-cycle/mon-cycle.component';
import { ForumComponent } from './DashUser/forum/forum.component';
import { ChoixDirectionComponent } from './choix-direction/choix-direction.component';
import { ConditionsDuComponent } from './conditions-du/conditions-du.component';
import { PolitiquedConfComponent } from './politiqued-conf/politiqued-conf.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:"accueil",component:AccueilComponent },
  {path:"inscriptionperson" , component:PersonnelComponent},
  {path:"inscriptionuser" , component:UsersComponent},
  {path:"login", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent,  canActivate: [AuthGuard] },
  {path:"listepatientesAdmin" , component:ListePatientesAdminComponent , canActivate: [AuthGuard] },
  {path:"ajoutPersoAdmin" , component:AjoutPersonelComponent ,  canActivate: [AuthGuard] },
  {path:"gestionContenuAdmin" , component:GestionContenuComponent, canActivate: [AuthGuard] },
  {path:"gestionPatientePS" , component: GestionPatientesComponent ,  canActivate: [AuthGuard] },
  {path:"gestionRVPS" , component:GestionRVComponent ,  canActivate: [AuthGuard] },
  {path:"ressourcesPS" , component:RessourcesComponent ,  canActivate: [AuthGuard] },
  {path:"monCycle" , component: MonCycleComponent,  canActivate: [AuthGuard] },
  {path:"Forum", component:ForumComponent , canActivate: [AuthGuard] },
  {path:"choixDirection" , component: ChoixDirectionComponent},
  {path:"conditionUtilisaton" , component: ConditionsDuComponent},
  {path:"politiqueConf" , component: PolitiquedConfComponent}
  



  // {path:"dashADmin" , component:DashboardAdminComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
