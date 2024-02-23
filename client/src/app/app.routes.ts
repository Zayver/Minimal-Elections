import { Routes } from '@angular/router';
import { VoteComponent } from './components/vote/vote.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {path:"", redirectTo: "vote", pathMatch: 'full'},
    {path:"vote", component: VoteComponent, title: "Votación Carlos Albán"},
    {path: "admin", component: AdminComponent, title: "Administración de votos"},
    {path: "**", component: NotfoundComponent, title: "404"}
];
