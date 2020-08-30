//-----------------------------------------------------------------------
// <copyright file="IHerculesApi.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client
{
    using System.Threading.Tasks;
    using Hercules.Api.Model.Admin;

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
    }
}