// -----------------------------------------------------------------------
// <copyright file="FenUtils.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    using System.Linq;
    using System.Text;

    /// <summary>
    /// A FenUtils class.
    /// </summary>
    public class FenUtils
    {
        /// <summary>
        /// Convert a fuzzy fen string to a board state regex for querying.
        /// </summary>
        /// <param name="fen">The FEN string.</param>
        /// <returns>The regex.</returns>
        public static string ToBoardStateRegex(string fen)
        {
            var positionPart = fen.Split(' ').First();
            positionPart = positionPart.Replace("/", string.Empty);
            var sb = new StringBuilder();
            foreach (var c in positionPart)
            {
                if (char.IsDigit(c))
                {
                    sb.AppendLine($".{{c}}");
                }
            }

            return sb.ToString();
        }
    }
}