//-----------------------------------------------------------------------
// <copyright file="HerculesApiClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client
{
    using System.Threading;
    using System.Threading.Tasks;
    using Amazon.Runtime;
    using Amazon.Runtime.Internal;
    using Amazon.Runtime.Internal.Auth;
    using Hercules.Api.Client.Marshalling;
    using Hercules.Api.Model.Admin;
    using Hercules.Api.Model.Database;
    using Hercules.Api.Model.Health;

    /// <summary>
    /// The implementation of the <see cref="IHerculesApi"/> interface.
    /// </summary>
    public class HerculesApiClient : AmazonServiceClient, IHerculesApi
    {
        private static IServiceMetadata serviceMetadata = new HerculesApiMetadata();

        /// <summary>
        /// Initializes a new instance of the <see cref="HerculesApiClient" /> class.
        /// </summary>
        /// <param name="credentials">AWS credentials.</param>
        /// <param name="endpoint">The endpoint.</param>
        public HerculesApiClient(AWSCredentials credentials, HerculesApiEndpoint endpoint)
            : base(credentials, new HerculesApiClientConfig()
            {
                ServiceURL = endpoint.Endpoint,
                AuthenticationRegion = "us-east-2",
            })
        {
        }

        /// <inheritdoc cref="AmazonServiceClient" />
        protected override IServiceMetadata ServiceMetadata
        {
            get
            {
                return serviceMetadata;
            }
        }

        /// <inheritdoc cref="IHerculesApi" />
        public async Task<InitializeUserResponse> InitializeUserAsync(
            InitializeUserRequest request)
        {
            var options = new InvokeOptions();
            options.RequestMarshaller = InitializeUserRequestMarshaller.Instance;
            options.ResponseUnmarshaller = InitializeUserResponseUnmarshaller.Instance;
            options.EndpointOperation = this.EndpointOperation;
            return await this.InvokeAsync<InitializeUserResponse>(request, options, CancellationToken.None);
        }

        /// <inheritdoc cref="IHerculesApi" />
        public async Task<GetSessionResponse> GetSessionAsync(GetSessionRequest request)
        {
            var options = new InvokeOptions();
            options.RequestMarshaller = GetSessionRequestMarshaller.Instance;
            options.ResponseUnmarshaller = GetSessionResponseUnmarshaller.Instance;
            options.EndpointOperation = this.EndpointOperation;
            return await this.InvokeAsync<GetSessionResponse>(request, options, CancellationToken.None);
        }

        /// <inheritdoc cref="IHerculesApi" />
        public async Task<NaturalSearchResponse> NaturalSearchAsync(NaturalSearchRequest request)
        {
            var options = new InvokeOptions();
            options.RequestMarshaller = NaturalSearchRequestMarshaller.Instance;
            options.ResponseUnmarshaller = NaturalSearchResponseUnmarshaller.Instance;
            options.EndpointOperation = this.EndpointOperation;
            return await this.InvokeAsync<NaturalSearchResponse>(request, options, CancellationToken.None);
        }

        /// <inheritdoc cref="AmazonServiceClient" />
        protected override AbstractAWSSigner CreateSigner()
        {
            return new AWS4Signer();
        }
    }
}