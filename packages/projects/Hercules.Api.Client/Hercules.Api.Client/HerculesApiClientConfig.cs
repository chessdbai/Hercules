//-----------------------------------------------------------------------
// <copyright file="HerculesApiClientConfig.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client
{
    using Amazon.Runtime;
    using Amazon.Util.Internal;

    /// <summary>
    /// A class to store the hercules-specific AWS SDK client configuration.
    /// </summary>
    public class HerculesApiClientConfig : ClientConfig
    {
        private static readonly string UserAgentString =
            InternalSDKUtils.BuildUserAgentString("3.3.104.14");

        private string userAgent = UserAgentString;

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiClientConfig" /> class.
        /// </summary>
        public HerculesApiClientConfig()
        {
            this.AuthenticationServiceName = "execute-api";
            this.MaxErrorRetry = 10;
        }

        /// <summary>
        /// Gets the constant used to lookup in the region hash the endpoint.
        /// </summary>
        public override string RegionEndpointServiceName
        {
            get
            {
                return "execute-api";
            }
        }

        /// <summary>
        /// Gets the ServiceVersion property.
        /// </summary>
        public override string ServiceVersion
        {
            get
            {
                return "2012-08-10";
            }
        }

        /// <summary>
        /// Gets the value of UserAgent property.
        /// </summary>
        public override string UserAgent
        {
            get
            {
                return this.userAgent;
            }
        }
    }
}