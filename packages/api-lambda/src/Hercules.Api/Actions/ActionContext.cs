//-----------------------------------------------------------------------
// <copyright file="ActionContext.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions
{
    using Amazon.Lambda.Core;

    /// <summary>
    /// A class to hold request context information.
    /// </summary>
    public class ActionContext
    {
        /// <summary>
        /// Gets or sets the request ID.
        /// </summary>
        public string RequestId { get; set; }

        /// <summary>
        /// Gets or sets the requester.
        /// </summary>
        public string Requester { get; set; }

        /// <summary>
        /// Gets or sets the context of the Lambda invocation.
        /// </summary>
        public ILambdaContext LambdaContext { get; set; }
    }
}