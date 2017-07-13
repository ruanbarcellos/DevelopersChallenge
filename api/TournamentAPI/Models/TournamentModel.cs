using System;
using System.Collections.Generic;

namespace TournamentAPI.Models
{
    /// <summary>
    /// Represents a tournament
    /// </summary>
    public class TournamentModel
    {
        public Int32 Id { get; set; }
        public String Name { get; set; }
        public Boolean Started { get { return Matches.Count > 0; } }
        public List<MatchModel> Matches { get; set; }
        public List<TeamModel> Teams { get; set; }
        public TeamModel Winner { get; set; }

        public TournamentModel()
        {
            Matches = new List<MatchModel>();
        }
    }
}