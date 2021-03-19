// -----------------------------------------------------------------------
// <copyright file="AthenaQueryConfig.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
// -----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    /// <summary>
    /// A AthenaQueryConfig class.
    /// </summary>
    public record AthenaQueryConfig
    {
        /// <summary>
        /// Gets the catalog name.
        /// </summary>
        public string Catalog { get; init; }

        /// <summary>
        /// Gets the workgroup name.
        /// </summary>
        public string Workgroup { get; init; }

        /// <summary>
        /// Gets the database name.
        /// </summary>
        public string Database { get; init; }

        /// <summary>
        /// Gets the table name.
        /// </summary>
        public string Table { get; init; }
    }
}