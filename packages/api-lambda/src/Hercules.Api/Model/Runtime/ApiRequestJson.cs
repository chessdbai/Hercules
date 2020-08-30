//-----------------------------------------------------------------------
// <copyright file="ApiRequestJson.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model.Runtime
{
    /// <summary>
    /// The request format for all API calls.
    /// </summary>
    public class ApiRequestJson
    {
        /// <summary>
        /// Gets or sets the request id.
        /// </summary>
        public string RequestId { get; set; }

        /// <summary>
        /// Gets or sets the requester login.
        /// </summary>
        public string Requester { get; set; }

        /// <summary>
        /// Gets or sets the API name.
        /// </summary>
        public string ApiName { get; set; }

        /// <summary>
        /// Gets or sets the input JSON string.
        /// </summary>
        public string Input { get; set; }

        /// <summary>
        /// Gets or sets the input object.
        /// </summary>
        public dynamic InputObject { get; set; }
    }
}