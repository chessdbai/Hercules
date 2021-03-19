//-----------------------------------------------------------------------
// <copyright file="PutGameResponse.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model.MyChess
{
    using Amazon.Runtime;

    /// <summary>
    /// The response from the PutGame API call.
    /// </summary>
    public class PutGameResponse : AmazonWebServiceResponse
    {
        /// <summary>
        /// Gets or sets the object ID of this game in the database.
        /// </summary>
        public string DatabaseObjectId { get; set; }
    }
}