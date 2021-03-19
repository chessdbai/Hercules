// -----------------------------------------------------------------------
// <copyright file="SkeletonSearchRequest.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Model.Database
{
    using System.Collections.Generic;

    /// <summary>
    /// A SkeletonSearchRequest class.
    /// </summary>
    public class SkeletonSearchRequest
    {
        /// <summary>
        /// Gets or sets the fuzzy fen string.
        /// </summary>
        public string FuzzyFen { get; set; }

        /// <summary>
        /// Gets or sets the result to filter by.
        /// </summary>
        public string Result { get; set; }

        /// <summary>
        /// Gets or sets the ECO to filter by.
        /// </summary>
        public string ECO { get; set; }

        /// <summary>
        /// Gets or sets the rating lower bound.
        /// </summary>
        public int? RatingLowerBound { get; set; }

        /// <summary>
        /// Gets or sets the next moves to filter by.
        /// </summary>
        public List<MoveFilter> NextMoves { get; set; }

        /// <summary>
        /// Gets or sets the previous moves to filter by.
        /// </summary>
        public List<MoveFilter> PreviousMoves { get; set; }
    }
}