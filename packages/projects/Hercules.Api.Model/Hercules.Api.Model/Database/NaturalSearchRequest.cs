//-----------------------------------------------------------------------
// <copyright file="NaturalSearchRequest.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model.Database
{
    using Amazon.Runtime;

    /// <summary>
    /// A class for the request parameters to the NaturalSearch API call.
    /// </summary>
    public class NaturalSearchRequest : AmazonWebServiceRequest
    {
        /// <summary>
        /// Gets or sets the language code for the request.
        /// </summary>
        public string LanguageCode { get; set; }

        /// <summary>
        /// Gets or sets the plain text search query for the request.
        /// </summary>
        public string SearchQuery { get; set; }
    }
}