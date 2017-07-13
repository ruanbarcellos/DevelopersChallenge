using System.Collections.Generic;
using System.Web.Http;
using TournamentAPI.Models;
using TournamentAPI.Services;

namespace TournamentAPI.Controllers
{
    [Route("api/Tournament/{tournamentId}/Match")]
    public class MatchController : ApiController
    {
        private readonly TournamentService Service = new TournamentService();

        // GET: api/Match
        [HttpGet, Route("api/Tournament/{tournamentId}/Match")]
        public IEnumerable<MatchModel> Get(int tournamentId)
        {
            var tournament = Service.FindById(tournamentId);
            if (tournament != null)
            {
                return tournament.Matches;
            }

            return null;
        }

        // PUT: api/Match/5
        [HttpPut, Route("api/Tournament/{tournamentId}/Match/{id}")]
        public MatchModel Put(int tournamentId, int id, [FromBody]MatchModel value)
        {
            return Service.SetScore(tournamentId, id, value);
        }
    }
}