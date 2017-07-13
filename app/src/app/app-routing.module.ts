import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/home/home.component';
import { TournamentComponent } from 'app/tournament/tournament.component';
import { TournamentDetailComponent } from 'app/tournament-detail/tournament-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tournament', component: TournamentComponent },
    { path: 'detail/:id', component: TournamentDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
