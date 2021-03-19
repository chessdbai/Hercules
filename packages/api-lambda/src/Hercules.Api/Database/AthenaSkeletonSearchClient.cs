// -----------------------------------------------------------------------
// <copyright file="AthenaSkeletonSearchClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Amazon.Athena;
    using Amazon.Athena.Model;
    using Hercules.Api.Model.Database;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// A AthenaSkeletonSearchClient_ class.
    /// </summary>
    public class AthenaSkeletonSearchClient : ISkeletonSearchClient
    {
        private readonly IAmazonAthena athena;
        private readonly AthenaQueryConfig queryConfig;
        private readonly ILogger<AthenaSkeletonSearchClient> logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="AthenaSkeletonSearchClient" /> class.
        /// </summary>
        /// <param name="athena">The elastic search nest client.</param>
        /// <param name="queryConfig">The query config.</param>
        /// <param name="logger">The logger.</param>
        public AthenaSkeletonSearchClient(
            IAmazonAthena athena,
            AthenaQueryConfig queryConfig,
            ILogger<AthenaSkeletonSearchClient> logger)
        {
            this.athena = athena;
            this.queryConfig = queryConfig;
            this.logger = logger;
        }

        /// <inheritdoc cref="ISkeletonSearchClient"/>
        public async Task<List<SkeletonSearchResult>> SearchAsync(string fuzzyFen, CancellationToken token = default(CancellationToken))
        {
            var req = new StartQueryExecutionRequest()
            {
                QueryExecutionContext = new QueryExecutionContext()
                {
                    Catalog = this.queryConfig.Catalog,
                    Database = this.queryConfig.Database,
                },
                QueryString = CreateQueryForTableName(this.queryConfig.Database, this.queryConfig.Table),
                WorkGroup = this.queryConfig.Workgroup,
            };

            var response = await this.athena.StartQueryExecutionAsync(req, token);
            string queryId = response.QueryExecutionId;
            this.logger.LogInformation($"Started query execution with id {queryId}.");

            GetQueryExecutionResponse executionResponse;
            while (true)
            {
                await Task.Delay(TimeSpan.FromSeconds(3), token);

                var getReq = new GetQueryExecutionRequest()
                {
                    QueryExecutionId = queryId,
                };
                executionResponse = await this.athena.GetQueryExecutionAsync(getReq, token);

                if (executionResponse.QueryExecution.Status.State == QueryExecutionState.RUNNING)
                {
                    continue;
                }

                break;
            }

            if (executionResponse.QueryExecution.Status.State == QueryExecutionState.FAILED)
            {
                throw new Exception(
                    $"Athena query failed because: {executionResponse.QueryExecution.Status.StateChangeReason}");
            }

            var getResultsRequest = new GetQueryResultsRequest()
            {
                QueryExecutionId = queryId,
                MaxResults = 1000,
            };
            var resultsResponse = await this.athena.GetQueryResultsAsync(getResultsRequest, token);
            var results = resultsResponse.ResultSet.Rows;
            return results.Skip(1).Select(
                    r => new SkeletonSearchResult()
                    {
                    })
                .ToList();
        }

        private static string CreateQueryForTableName(string database, string tableName)
        {
            var myType = typeof(AthenaSkeletonSearchClient);
            var myNs = myType.Namespace;
            var fullPath = $"{myNs}.Queries.skeleton.sql";
            using var stream = myType.Assembly.GetManifestResourceStream(fullPath);
            using var reader = new StreamReader(stream!);
            string query = reader.ReadToEnd();
            return query
                .Replace("%tablename%", tableName)
                .Replace("%database%", database);
        }
    }
}