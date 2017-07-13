using System;

namespace TournamentAPI.Models
{
    /// <summary>
    /// Represents a match
    /// </summary>
    public class MatchModel
    {
        public Int32 Id { get; set; }
        public TeamModel TeamA { get; set; }
        public TeamModel TeamB { get; set; }
        public Int32? TeamAScore { get; set; }
        public Int32? TeamBScore { get; set; }
        public Int32 Order { get; set; }

        public TeamModel Winner
        {
            get
            {
                if (TeamAScore != 0 && TeamBScore != 0 && TeamAScore != TeamBScore)
                {
                    return TeamAScore > TeamBScore ? TeamA : TeamB;
                }

                return null;
            }
        }
    }
}