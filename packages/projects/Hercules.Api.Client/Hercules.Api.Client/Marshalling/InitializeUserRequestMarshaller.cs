//-----------------------------------------------------------------------
// <copyright file="InitializeUserRequestMarshaller.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client.Marshalling
{
    using Amazon.Runtime;
    using Amazon.Runtime.Internal;
    using Amazon.Runtime.Internal.Transform;
    using Hercules.Api.Model.Admin;
    using Newtonsoft.Json;

    /// <summary>
    /// A request marshaller to marshall InitializeUser request objects.
    /// </summary>
    public class InitializeUserRequestMarshaller : IMarshaller<IRequest, InitializeUserRequest>, IMarshaller<IRequest, AmazonWebServiceRequest>
    {
        private static InitializeUserRequestMarshaller instance = new InitializeUserRequestMarshaller();

        /// <summary>
        /// Gets the singleton.
        /// </summary>
        public static InitializeUserRequestMarshaller Instance
        {
            get
            {
                return instance;
            }
        }

        /// <summary>
        /// Marshaller the request object to the HTTP request.
        /// </summary>
        /// <param name="input">The public request.</param>
        /// <returns>The internal request object.</returns>
        public IRequest Marshall(AmazonWebServiceRequest input)
        {
            return this.Marshall((InitializeUserRequest)input);
        }

        /// <summary>
        /// Marshaller the request object to the HTTP request.
        /// </summary>
        /// <param name="publicRequest">The public request.</param>
        /// <returns>The internal request object.</returns>
        public IRequest Marshall(InitializeUserRequest publicRequest)
        {
            IRequest request = new DefaultRequest(publicRequest, "execute-api");
            request.Headers["Content-Type"] = "application/json";
            request.HttpMethod = "PUT";
            request.ResourcePath = "/admin/user/";
            request.MarshallerVersion = 2;
            var requestJson = JsonConvert.SerializeObject(publicRequest);
            request.Content = System.Text.Encoding.UTF8.GetBytes(requestJson);
            return request;
        }

        /// <summary>
        /// Gets the singleton instance of this unmarshaller.
        /// </summary>
        /// <returns>The singleton instance of this unmarshaller.</returns>
        internal static InitializeUserRequestMarshaller GetInstance()
        {
            return instance;
        }
    }
}