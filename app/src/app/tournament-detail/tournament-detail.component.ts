import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Http } from '@angular/http';
import { MdDialog } from "@angular/material";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { apiUrl } from "app/app.config";
import { Match } from '../shared/match.model';
import { Team } from '../shared/team.model';
import { Tournament } from '../shared/tournament.model';
import { MatchComponent } from '../match/match.component';

@Component({
    selector: 'tm-tournament-detail',
    templateUrl: 'tournament-detail.component.html',
    styleUrls: ['tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
    tournament: Tournament;

    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private dialog: MdDialog,
        private router: Router) { }

    ngOnInit() {
        this.route.paramMap.switchMap(param => this.getTournament(param.get('id')))
            .subscribe(tournament => {
                if (!tournament) {
                    this.router.navigate(['']);
                }
                this.tournament = tournament;
            });
    }

    getWinnerClass(match: Match, teamId: number): string {
        if (!match.winner && match.teamAScore !== null && match.teamBScore !== null && match.teamAScore === match.teamBScore) {
            return 'draw';
        }

        if (!match.winner || !teamId) {
            return '';
        }

        return match.winner.id === teamId ? 'winner' : 'loser';
    }

    editMatchScore(match: Match): void {
        const data = {
            match,
            tournament: this.tournament
        };

        const modalRef = this.dialog.open(MatchComponent, { data });
        const subscription = modalRef.afterClosed().subscribe((result: Match) => {
            if (result) {
                this.ngOnInit();
            }

            return subscription && !subscription.closed && subscription.unsubscribe();
        });
    }

    hasWinner(): boolean {
        return this.tournament.winner && this.tournament.winner.name && this.tournament.winner.name.length > 0;
    }

    private getTournament(tournamentId): Observable<Tournament> {
        return this.http.get(`${apiUrl}/tournament/${tournamentId}`)
            .map(response => response.json() as Tournament);
    }
}