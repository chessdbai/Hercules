//-----------------------------------------------------------------------
// <copyright file="HerculesApiMetadata.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client
{
    using Amazon.Runtime.Internal;

    /// <summary>
    /// The service API metadata.
    /// </summary>
    public class HerculesApiMetadata : IServiceMetadata
    {
        /// <summary>
        /// Gets the value of the Service Id.
        /// </summary>
        public string ServiceId
        {
            get
            {
                return "HerculesApi";
            }
        }

        /// <summary>
        /// Gets the dictionary that gives mapping of renamed operations.
        /// </summary>
        public System.Collections.Generic.IDictionary<string, string> OperationNameMapping
        {
            get
            {
                return new System.Collections.Generic.Dictionary<string, string>(0)
                {
                };
            }
        }
    }
}