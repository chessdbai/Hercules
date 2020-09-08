//-----------------------------------------------------------------------
// <copyright file="ISearchClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Database
{
    using System.Threading.Tasks;
    using Hercules.Api.Database.Storage;

    /// <summary>
    /// A client to search and index documents.
    /// </summary>
    public interface ISearchClient
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="pgnGame"></param>
        /// <returns></returns>
        Task IndexGameAsync(IndexedGame pgnGame);
    }
}