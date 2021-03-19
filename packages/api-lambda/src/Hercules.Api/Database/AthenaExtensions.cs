// -----------------------------------------------------------------------
// <copyright file="AthenaExtensions.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    using System;
    using Amazon.Athena.Model;

    /// <summary>
    /// A AthenaExtensions class.
    /// </summary>
    public static class AthenaExtensions
    {
        /// <summary>
        /// Converts an Athena datum to double.
        /// </summary>
        /// <param name="datum">An Athena Datum.</param>
        /// <returns>A double.</returns>
        public static double ToDouble(this Datum datum)
        {
            try
            {
                return double.Parse(datum.VarCharValue);
            }
            catch (Exception)
            {
                return 0.0;
            }
        }
    }
}