//-----------------------------------------------------------------------
// <copyright file="InitializeUserRequest.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model.Admin
{
    using Amazon.Runtime;

    /// <summary>
    /// A request object to set up a user's initial group and database id.
    /// </summary>
    public class InitializeUserRequest : AmazonWebServiceRequest
    {
        /// <summary>
        /// Gets or sets the username of the user.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Gets or sets the initial group.
        /// </summary>
        public string InitialGroup { get; set; }
    }
}