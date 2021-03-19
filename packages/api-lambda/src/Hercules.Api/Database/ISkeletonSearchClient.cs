// -----------------------------------------------------------------------
// <copyright file="ISkeletonSearchClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Hercules.Api.Model.Database;

    /// <summary>
    /// A skeleton search client.
    /// </summary>
    public interface ISkeletonSearchClient
    {
        /// <summary>
        /// Do a fuzzy FEN string search.
        /// </summary>
        /// <param name="fuzzyFen">The fuzzy fen.</param>
        /// <param name="token">The cancellation token.</param>
        /// <returns>The list of results.</returns>
        Task<List<SkeletonSearchResult>> SearchAsync(string fuzzyFen, CancellationToken token = default(CancellationToken));
    }
}