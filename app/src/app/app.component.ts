import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    template: `
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
    <button md-raised-button (click)="goBack()">Back</button>
  `,
})
export class AppComponent {
    title = 'Tournament Manager';

    constructor(private location: Location) { }

    goBack(): void {
        this.location.back();
    }
}
