using Amazon.Runtime;

namespace ZugzwangStudy.ApiClient.Model
{
    public class InitializeUserRequest : AmazonWebServiceRequest
    {
        public string Username { get; set; }
        public string InitialGroup { get; set; }
    }
}