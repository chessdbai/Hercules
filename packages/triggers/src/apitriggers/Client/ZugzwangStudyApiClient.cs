using System.Threading;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Amazon.Runtime.Internal;
using Amazon.Runtime.Internal.Auth;
using ZugzwangStudy.ApiClient.Model;
using ZugzwangStudy.ApiClient.Model.Marshalling;

namespace ZugzwangStudy.ApiClient
{
    public class ZugzwangStudyApiClient : AmazonServiceClient, IZugzwangStudyApi
    {
        private static IServiceMetadata serviceMetadata = new ZugzwangStudyApiMetadata();
        #region Constructors
        public ZugzwangStudyApiClient(AWSCredentials credentials, StudyApiEndpoint endpoint)
            : base(credentials, new ZugzwangStudyApiClientConfig()
            {
                ServiceURL = endpoint.Endpoint,
                AuthenticationRegion = RegionEndpoint.USEast2.SystemName
            }) { }

        #endregion

        #region Overrides

        protected override AbstractAWSSigner CreateSigner()
        {
            return new AWS4Signer();
        }    

        protected override IServiceMetadata ServiceMetadata
        {
            get
            {
                return serviceMetadata;
            }
        }

        #endregion

        #region Dispose

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        #endregion

        public async Task<InitializeUserResponse> InitializeUserAsync(
            InitializeUserRequest request)
        {
            var options = new InvokeOptions();
            options.RequestMarshaller = InitializeUserRequestMarshaller.Instance;
            options.ResponseUnmarshaller = InitializeUserResponseUnmarshaller.Instance;
            options.EndpointOperation = EndpointOperation;
            return await InvokeAsync<InitializeUserResponse>(request, options, CancellationToken.None);
        }
    }
}