// -----------------------------------------------------------------------
// <copyright file="MoveFilter.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Model.Database
{
    /// <summary>
    /// A MoveFilter class.
    /// </summary>
    public class MoveFilter
    {
        /// <summary>
        /// Gets or sets the move text.
        /// </summary>
        public string MoveText { get; set; }

        /// <summary>
        /// Gets or sets the move format (UCI/SAN).
        /// </summary>
        public string MoveFormat { get; set; }
    }
}