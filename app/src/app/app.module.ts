import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { HomeComponent } from 'app/home/home.component';
import { MatchComponent } from 'app/match/match.component';
import { TournamentComponent } from "app/tournament/tournament.component";
import { TournamentDetailComponent } from 'app/tournament-detail/tournament-detail.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MatchComponent,
        TournamentComponent,
        TournamentDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        HttpModule,
        AppRoutingModule
    ],
    entryComponents: [
        MatchComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
