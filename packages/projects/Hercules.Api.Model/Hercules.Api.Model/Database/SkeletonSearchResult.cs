// -----------------------------------------------------------------------
// <copyright file="SkeletonSearchResult.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Model.Database
{
    /// <summary>
    /// A SkeletonSearchResult class.
    /// </summary>
    public class SkeletonSearchResult
    {
        /// <summary>
        /// Gets or sets the game id.
        /// </summary>
        public string GameId { get; set; }

        /// <summary>
        /// Gets or sets the fen string.
        /// </summary>
        public string Fen { get; set; }

        /// <summary>
        /// Gets or sets the result.
        /// </summary>
        public string Result { get; set; }

        /// <summary>
        /// Gets or sets the ECO.
        /// </summary>
        public string ECO { get; set; }

        /// <summary>
        /// Gets or sets the name of the black player.
        /// </summary>
        public string WhitePlayer { get; set; }

        /// <summary>
        /// Gets or sets the ELO of the white player.
        /// </summary>
        public int WhitePlayerELO { get; set; }

        /// <summary>
        /// Gets or sets the name of the black player.
        /// </summary>
        public string BlackPlayer { get; set; }

        /// <summary>
        /// Gets or sets the ELO of the black player.
        /// </summary>
        public int BlackPlayerELO { get; set; }

        /// <summary>
        /// Gets or sets the next move in San notation.
        /// </summary>
        public string NextMoveSan { get; set; }

        /// <summary>
        /// Gets or sets the next move in San notation.
        /// </summary>
        public string PreviousMoveSan { get; set; }
    }
}