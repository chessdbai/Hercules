//-----------------------------------------------------------------------
// <copyright file="IUserClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Clients.Users
{
    using System.Threading.Tasks;

    /// <summary>
    /// A client to manage users.
    /// </summary>
    public interface IUserClient
    {
        /// <summary>
        /// Get the database ID for a user.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <returns>An awaitable task with the database ID as the value.</returns>
        Task<string> GetUserDatabaseIdAsync(string username);

        /// <summary>
        /// Sets the database ID for a user.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <param name="databaseId">The database id.</param>
        /// <returns>An awaitable task.</returns>
        Task SetUserDatabaseIdAsync(string username, string databaseId);

        /// <summary>
        /// Add the user to the group.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <param name="groupName">The name of the group.</param>
        /// <returns>An awaitable task.</returns>
        Task AddUserToGroupAsync(string username, string groupName);
    }
}