//-----------------------------------------------------------------------
// <copyright file="NaturalSearchRequestMarshaller.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client.Marshalling
{
    using Amazon.Runtime;
    using Amazon.Runtime.Internal;
    using Amazon.Runtime.Internal.Transform;
    using Hercules.Api.Model.Admin;
    using Hercules.Api.Model.Database;
    using Newtonsoft.Json;

    /// <summary>
    /// A request marshaller to marshall InitializeUser request objects.
    /// </summary>
    public class NaturalSearchRequestMarshaller : IMarshaller<IRequest, NaturalSearchRequest>, IMarshaller<IRequest, AmazonWebServiceRequest>
    {
        private static NaturalSearchRequestMarshaller instance = new NaturalSearchRequestMarshaller();

        /// <summary>
        /// Gets the singleton.
        /// </summary>
        public static NaturalSearchRequestMarshaller Instance
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
            return this.Marshall((NaturalSearchRequest)input);
        }

        /// <summary>
        /// Marshaller the request object to the HTTP request.
        /// </summary>
        /// <param name="publicRequest">The public request.</param>
        /// <returns>The internal request object.</returns>
        public IRequest Marshall(NaturalSearchRequest publicRequest)
        {
            IRequest request = new DefaultRequest(publicRequest, "execute-api");
            request.Headers["Content-Type"] = "application/json";
            request.HttpMethod = "GET";
            request.ResourcePath = "/search/natural/";
            request.MarshallerVersion = 2;
            request.Parameters.Add("l", publicRequest.LanguageCode);
            request.Parameters.Add("q", publicRequest.SearchQuery);
            return request;
        }

        /// <summary>
        /// Gets the singleton instance of this marshaller.
        /// </summary>
        /// <returns>The singleton instance of this marshaller.</returns>
        internal static NaturalSearchRequestMarshaller GetInstance()
        {
            return instance;
        }
    }
}