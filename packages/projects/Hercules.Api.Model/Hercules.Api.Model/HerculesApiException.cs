//-----------------------------------------------------------------------
// <copyright file="HerculesApiException.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model
{
    using System;
    using Amazon.Runtime;

    /// <summary>
    /// A general, top-level API exception.
    /// </summary>
    public class HerculesApiException : AmazonServiceException
    {
        private readonly int statusCode;

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiException" /> class.
        /// </summary>
        /// <param name="statusCode">The status code.</param>
        public HerculesApiException(int statusCode)
        {
            this.statusCode = statusCode;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiException" /> class.
        /// </summary>
        /// <param name="statusCode">The status code.</param>
        /// <param name="message">The error message.</param>
        public HerculesApiException(int statusCode, string message)
            : base(message)
        {
            this.statusCode = statusCode;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiException" /> class.
        /// </summary>
        /// <param name="statusCode">The status code.</param>
        /// <param name="message">The error message.</param>
        /// <param name="inner">The inner exception.</param>
        public HerculesApiException(int statusCode, string message, Exception inner)
            : base(message, inner)
        {
            this.statusCode = statusCode;
        }
    }
}