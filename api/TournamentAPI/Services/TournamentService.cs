using System;
using System.Collections.Generic;
using System.Linq;
using TournamentAPI.Models;

namespace TournamentAPI.Services
{
    public class TournamentService
    {
        private readonly Random Random = new Random();
        private static readonly Object syncLock = new Object();
        private static List<TournamentModel> Tournaments = new List<TournamentModel>();

        /// <summary>
        /// Creates a new tournament
        /// </summary>
        /// <param name="tournament">the tournament that should be created</param>
        /// <returns>The newly created tournament</returns>
        /// <exception cref="ArgumentException">When the tournament already exists</exception>
        public TournamentModel Add(TournamentModel tournament)
        {
            if (tournament.Id != 0 && Tournaments.Any(t => t.Id == tournament.Id))
            {
                throw new ArgumentException();
            }

            tournament.Id = GetNewId();
            tournament.Teams.ForEach(t => t.Id = GetNewId());
            tournament.Matches = SortMatches(tournament.Teams);
            Tournaments.Add(tournament);

            return tournament;
        }

        /// <summary>
        /// Updates a tournament
        /// </summary>
        /// <param name="id">the id of the tournament that should be updated</param>
        /// <param name="tournament">the new tournament data</param>
        /// <returns>The updated tournament</returns>
        /// <exception cref="ArgumentNullException">When the tournament does not exists</exception>
        public TournamentModel Update(Int32 id, TournamentModel tournament)
        {
            if (tournament.Id == 0 || !Tournaments.Any(t => t.Id == tournament.Id))
            {
                throw new ArgumentNullException();
            }

            tournament.Id = id;
            Tournaments.ForEach(t =>
            {
                if (t.Id == id)
                {
                    t = tournament;
                }
            });

            return tournament;
        }

        /// <summary>
        /// Retrieves all created tournaments
        /// </summary>
        /// <returns>All the tournaments</returns>
        public IEnumerable<TournamentModel> FindAll()
        {
            return Tournaments;
        }

        /// <summary>
        /// Finds a tournament for a given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The tournament that matches the id</returns>
        public TournamentModel FindById(Int32 id)
        {
            return Tournaments.Find(t => t.Id == id);
        }

        /// <summary>
        /// Removes a tournament
        /// </summary>
        /// <param name="id">The id of tournament that should be removed</param>
        public void RemoveBydId(Int32 id)
        {
            Tournaments.RemoveAll(t => t.Id == id);
        }

        /// <summary>
        /// Sets the match final score and decide the winner
        /// </summary>
        /// <param name="id">the tournament id</param>
        /// <param name="match">the match</param>
        /// <returns>the current match data containing the winner</returns>
        public MatchModel SetScore(Int32 id, Int32 matchId, MatchModel match)
        {
            var tournament = FindById(id);
            if (tournament == null)
            {
                return null;
            }

            var currentMatch = tournament.Matches.Find(m => m.Id == matchId);
            currentMatch.TeamAScore = match.TeamAScore;
            currentMatch.TeamBScore = match.TeamBScore;

            SetWinnerMatch(tournament, currentMatch.Order, currentMatch.Winner);

            return currentMatch;
        }

        private void SetWinnerMatch(TournamentModel tournament, Int32 matchOrder, TeamModel winner)
        {
            var match = tournament.Matches.FirstOrDefault(m => m.Order > matchOrder && m.TeamA == null);
            if (match != null)
            {
                match.TeamA = winner;
                return;
            }

            match = tournament.Matches.FirstOrDefault(m => m.Order > matchOrder && m.TeamB == null);
            if (match != null)
            {
                match.TeamB = winner;
                return;
            }

            tournament.Winner = winner;
        }

        /// <summary>
        /// Starts a tournament by creating all matches
        /// </summary>
        /// <param name="tournamentId">the id of a tournament that should be started</param>
        /// <returns>The started tournament</returns>
        private List<MatchModel> SortMatches(IEnumerable<TeamModel> allTeams)
        {
            var allMatches = new List<MatchModel>();

            // Shuffle teams
            var shuffledTeams = allTeams.OrderBy(t => Guid.NewGuid()).ToList();
            var order = 1;
            while (shuffledTeams.Count > 0)
            {
                var match = new MatchModel();
                match.Id = GetNewId();
                match.TeamA = shuffledTeams.ElementAt(0);
                match.Order = order++;
                shuffledTeams.RemoveAt(0);

                if (shuffledTeams.Count > 0)
                {
                    match.TeamB = shuffledTeams.ElementAt(0);
                    shuffledTeams.RemoveAt(0);
                }

                allMatches.Add(match);
            }

            while (allMatches.Count < allTeams.Count() - 1)
            {
                allMatches.Add(new MatchModel
                {
                    Id = GetNewId(),
                    Order = order++
                });
            }

            return allMatches.OrderBy(m => m.Order).ToList();
        }

        /// <summary>
        /// Gets a new random id
        /// </summary>
        /// <returns></returns>
        private Int32 GetNewId()
        {
            lock (syncLock)
            {
                return Random.Next();
            }
        }
    }
}