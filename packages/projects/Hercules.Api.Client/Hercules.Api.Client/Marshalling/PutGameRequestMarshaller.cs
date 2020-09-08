//-----------------------------------------------------------------------
// <copyright file="GetSessionRequestMarshaller.cs" company="ChessDB.AI">
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
    public class GetSessionRequestMarshaller : IMarshaller<IRequest, InitializeUserRequest>, IMarshaller<IRequest, AmazonWebServiceRequest>
    {
        private static GetSessionRequestMarshaller instance = new GetSessionRequestMarshaller();

        /// <summary>
        /// Gets the singleton.
        /// </summary>
        public static GetSessionRequestMarshaller Instance
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
            request.HttpMethod = "GET";
            request.ResourcePath = "/health/";
            request.MarshallerVersion = 2;
            return request;
        }

        /// <summary>
        /// Gets the singleton instance of this marshaller.
        /// </summary>
        /// <returns>The singleton instance of this marshaller.</returns>
        internal static GetSessionRequestMarshaller GetInstance()
        {
            return instance;
        }
    }
}