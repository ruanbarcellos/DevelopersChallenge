import { Team } from "app/shared/team.model";

export class Match {
    id: number;
    teamA: Team;
    teamB: Team;
    teamAScore: number;
    teamBScore: number;

    winner: Team;
}
