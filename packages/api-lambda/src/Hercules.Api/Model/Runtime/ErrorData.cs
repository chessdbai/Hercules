//-----------------------------------------------------------------------
// <copyright file="ErrorData.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Model.Runtime
{
    /// <summary>
    /// A collection of data to serialize whenever an exception is thrown.
    /// </summary>
    public class ErrorData
    {
        /// <summary>
        /// Gets or sets the type of error.
        /// </summary>
        public string ErrorType { get; set; }

        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Gets or sets the error code.
        /// </summary>
        public int ErrorCode { get; set; }
    }
}