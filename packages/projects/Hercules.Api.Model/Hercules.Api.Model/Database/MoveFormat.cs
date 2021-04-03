// -----------------------------------------------------------------------
// <copyright file="MoveFormat.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Model.Database
{
    /// <summary>
    /// The different formats that a chess move may be represented in.
    /// </summary>
    public enum MoveFormat
    {
        /// <summary>
        /// A chess move in standard algebraic notation.
        /// <a href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">SAN</a>
        /// </summary>
        SAN,

        /// <summary>
        /// A chess move in Universal Chess Interface notation.
        /// <a href="https://en.wikipedia.org/wiki/Universal_Chess_Interface">UCI</a>
        /// </summary>
        UCI,
    }
}