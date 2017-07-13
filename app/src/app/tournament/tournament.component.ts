import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { apiUrl } from 'app/app.config';
import { Tournament } from 'app/shared/tournament.model';
import { Team } from '../shared/team.model';

@Component({
    selector: 'tm-tournament',
    template: `
    <form>
        <div>
            <md-input-container>
                <input mdInput placeholder="Tournament name" required [(ngModel)]="tournament.name" [ngModelOptions]="{standalone: true}">
            </md-input-container>
        </div>
        <div *ngFor="let team of tournament.teams">
            <md-input-container>
                <input mdInput placeholder="Team name" required [(ngModel)]="team.name" [ngModelOptions]="{standalone: true}">
            </md-input-container>
        </div>
        <div>
            <button type="submit" md-raised-button (click)="createTournament(tournament)">Create new tournament</button>
            <button type="button" md-button (click)="addTeam(name)">add team</button>
        </div>
    </form>

    `
})
export class TournamentComponent {
    tournament: Tournament;

    constructor(private http: Http, private router: Router) {
        this.tournament = new Tournament();
    }

    createTournament(tournament: Tournament): void {
        tournament.teams = tournament.teams.filter(t => t.name && t.name.length);
        if (!tournament.teams.length) {
            return alert('The tournament must have at least 2 teams');
        }

        const subscription = this.http.post(`${apiUrl}/tournament`, tournament)
            .map(response => response.json() as Tournament)
            .subscribe(tournament => {
                subscription.unsubscribe();
                this.router.navigate(['detail', tournament.id]);
            });
    }

    addTeam(): void {
        this.tournament.teams.push(new Team());
    }
}