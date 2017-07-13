import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from "rxjs/Observable";

import { apiUrl } from "app/app.config";
import { Tournament } from "app/shared/tournament.model";

@Component({
    selector: 'tm-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    tournaments: Observable<Tournament[]>;

    constructor(private http: Http, private router: Router) {
        this.tournaments = this.http.get(`${apiUrl}/tournament`).map(response => response.json() as Tournament[]);
    }

    createTournament(): void {
        this.router.navigate(['tournament']);
    }
}