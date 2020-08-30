using Amazon.Runtime.Internal;

namespace ZugzwangStudy.ApiClient
{
    public class ZugzwangStudyApiMetadata : IServiceMetadata
    {
        /// <summary>
        /// Gets the value of the Service Id.
        /// </summary>
        public string ServiceId
        {
            get
            {
                return "ZugzwangStudyApi";
            }
        }

        /// <summary>
        /// Gets the dictionary that gives mapping of renamed operations
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