import { Match } from "app/shared/match.model";
import { Team } from "app/shared/team.model";

export class Tournament {
    id: number;
    name: string;

    matches: Match[];
    teams: Team[];
    winner: Team;

    started: boolean;

    constructor() {
        this.matches = [];
        this.teams = [];
    }
}