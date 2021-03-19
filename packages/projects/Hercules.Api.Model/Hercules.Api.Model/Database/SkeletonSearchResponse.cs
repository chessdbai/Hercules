// -----------------------------------------------------------------------
// <copyright file="SkeletonSearchResponse.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Model.Database
{
    using System.Collections.Generic;

    /// <summary>
    /// A SkeletonSearchResponse class.
    /// </summary>
    public class SkeletonSearchResponse
    {
        /// <summary>
        /// Gets or sets the list of results.
        /// </summary>
        public List<SkeletonSearchResult> Results { get; set; }
    }
}