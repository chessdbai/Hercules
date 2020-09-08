//-----------------------------------------------------------------------
// <copyright file="ElasticSearchClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    using System.Threading.Tasks;
    using Hercules.Api.Database.Storage;
    using Microsoft.Extensions.Logging;
    using Nest;

    /// <summary>
    /// A search client implemented via ElasticSearch.
    /// </summary>
    public class ElasticSearchClient : ISearchClient
    {
        private readonly IElasticClient elasticClient;
        private readonly ILogger<ElasticSearchClient> logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="ElasticSearchClient" /> class.
        /// </summary>
        /// <param name="clusterUrl">The type of the handler.</param>
        /// <param name="logger">The logger.</param>
        public ElasticSearchClient(
            IElasticClient elasticClient,
            ILogger<ElasticSearchClient> logger)
        {
            this.elasticClient = elasticClient;
            this.logger = logger;
        }

        /// <inheritdoc cref="ISearchClient"/>
        public async Task IndexGameAsync(IndexedGame pgnGame)
        {

        }
    }
}