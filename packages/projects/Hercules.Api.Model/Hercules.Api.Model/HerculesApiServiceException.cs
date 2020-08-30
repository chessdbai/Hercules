//-----------------------------------------------------------------------
// <copyright file="HerculesApiServiceException.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model
{
    using System;

    /// <summary>
    /// A general, top-level API exception.
    /// </summary>
    public class HerculesApiServiceException : HerculesApiException
    {
        /// <summary>
        /// The status code to use for this exception type.
        /// </summary>
        public const int ExceptionStatusCode = 500;

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiServiceException" /> class.
        /// </summary>
        public HerculesApiServiceException()
            : base(ExceptionStatusCode)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiServiceException" /> class.
        /// </summary>
        /// <param name="message">The error message.</param>
        public HerculesApiServiceException(string message)
            : base(ExceptionStatusCode, message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiServiceException" /> class.
        /// </summary>
        /// <param name="message">The error message.</param>
        /// <param name="inner">The inner exception.</param>
        public HerculesApiServiceException(string message, Exception inner)
            : base(ExceptionStatusCode, message, inner)
        {
        }
    }
}