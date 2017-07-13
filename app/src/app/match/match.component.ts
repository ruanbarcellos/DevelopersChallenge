import { apiUrl } from '../app.config';
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

import { Match } from "app/shared/match.model";
import { Tournament } from "app/shared/tournament.model";

@Component({
    selector: 'tm-match',
    templateUrl: 'match.component.html'
})
export class MatchComponent {
    match: Match;
    private tournament: Tournament;

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private http: Http, private dialogRef: MdDialogRef<MatchComponent>) {
        this.match = Object.assign(data.match);
        this.tournament = data.tournament;
    }

    setScore(): void {
        this.http.put(`${apiUrl}/tournament/${this.tournament.id}/match/${this.match.id}`, this.match)
            .map(response => response.json() as Match)
            .subscribe(match => this.dialogRef.close(match));
    }
}