//-----------------------------------------------------------------------
// <copyright file="IHerculesApi.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client
{
    using System.Threading.Tasks;
    using Hercules.Api.Model.Admin;
    using Hercules.Api.Model.Database;
    using Hercules.Api.Model.Health;

    /// <summary>
    /// The required methods to implement a Hercules API client.
    /// </summary>
    public interface IHerculesApi
    {
        /// <summary>
        /// Makes a request to the Hercules API to initialize a user.
        /// </summary>
        /// <param name="request">The <see cref="InitializeUserRequest"/> request object.</param>
        /// <returns>An awaitable task with the response.</returns>
        Task<InitializeUserResponse> InitializeUserAsync(InitializeUserRequest request);

        /// <summary>
        /// Makes a request to the Hercules API to initialize a user.
        /// </summary>
        /// <param name="request">The <see cref="GetSessionRequest"/> request object.</param>
        /// <returns>An awaitable task with the response.</returns>
        Task<GetSessionResponse> GetSessionAsync(GetSessionRequest request);

        /// <summary>
        /// Makes a request to the Hercules API to perform a natural language search request.
        /// </summary>
        /// <param name="request">The <see cref="NaturalSearchRequest"/> request object.</param>
        /// <returns>An awaitable task with the response.</returns>
        Task<NaturalSearchResponse> NaturalSearchAsync(NaturalSearchRequest request);
    }
}