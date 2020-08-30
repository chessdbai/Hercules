//-----------------------------------------------------------------------
// <copyright file="GetSessionResponse.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model.Health
{
    using Amazon.Runtime;

    /// <summary>
    /// The response to the GetSession API call.
    /// </summary>
    public class GetSessionResponse : AmazonWebServiceResponse
    {
        /// <summary>
        /// Gets or sets the username response.
        /// </summary>
        public string Username { get; set; }
    }
}