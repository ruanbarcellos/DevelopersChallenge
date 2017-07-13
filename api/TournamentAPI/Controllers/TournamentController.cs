using System;
using System.Collections.Generic;
using System.Web.Http;
using TournamentAPI.Models;
using TournamentAPI.Services;

namespace TournamentManager.Controllers
{
    [Route("api/Tournament")]
    public class TournamentController : ApiController
    {
        private readonly TournamentService Service = new TournamentService();

        // GET: api/Tournament
        [HttpGet]
        public IEnumerable<TournamentModel> Get()
        {
            return Service.FindAll();
        }

        // GET: api/Tournament/5
        [HttpGet, Route("api/Tournament/{id}")]
        public TournamentModel Get(Int32 id)
        {
            return Service.FindById(id);
        }

        // POST: api/Tournament
        [HttpPost]
        public TournamentModel Post([FromBody]TournamentModel value)
        {
            return Service.Add(value);
        }

        // PUT: api/Tournament/5
        [HttpPut, Route("{id}")]
        public TournamentModel Put(Int32 id, [FromBody]TournamentModel value)
        {
            return Service.Update(id, value);
        }

        // DELETE: api/Tournament/5
        [HttpDelete, Route("{id}")]
        public void Delete(Int32 id)
        {
            Service.RemoveBydId(id);
        }
    }
}