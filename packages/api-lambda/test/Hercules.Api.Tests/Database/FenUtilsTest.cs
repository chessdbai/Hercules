// -----------------------------------------------------------------------
// <copyright file="FenUtils.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Tests.Database
{
    using Hercules.Api.Database;
    using Xunit;

    /// <summary>
    /// A FenUtils class.
    /// </summary>
    public class FenUtilsTest
    {
        [Fact]
        public void CovertsFenToRegexCorrectly()
        {
            string fen = "8/5pbp/6p1/8/8/6P1/5PBP/8 w - - 0 1";

            string converted = FenUtils.ToBoardStateRegex(fen);
            Assert.Equal(".{8}.{5}pbp.{6}p.{1}.{8}.{8}.{6}P.{1}.{5}PBP.{8}", converted);
        }
    }
}