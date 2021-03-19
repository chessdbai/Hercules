//-----------------------------------------------------------------------
// <copyright file="PutGameRequestMarshaller.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client.Marshalling
{
    using Amazon.Runtime;
    using Amazon.Runtime.Internal;
    using Amazon.Runtime.Internal.Transform;
    using Hercules.Api.Model.Admin;
    using Hercules.Api.Model.MyChess;
    using Newtonsoft.Json;

    /// <summary>
    /// A request marshaller to marshall InitializeUser request objects.
    /// </summary>
    public class PutGameRequestMarshaller : IMarshaller<IRequest, PutGameRequest>, IMarshaller<IRequest, AmazonWebServiceRequest>
    {
        private static PutGameRequestMarshaller instance = new PutGameRequestMarshaller();

        /// <summary>
        /// Gets the singleton.
        /// </summary>
        public static PutGameRequestMarshaller Instance
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
            return this.Marshall((PutGameRequest)input);
        }

        /// <summary>
        /// Marshaller the request object to the HTTP request.
        /// </summary>
        /// <param name="publicRequest">The public request.</param>
        /// <returns>The internal request object.</returns>
        public IRequest Marshall(PutGameRequest publicRequest)
        {
            IRequest request = new DefaultRequest(publicRequest, "execute-api");
            request.Headers["Content-Type"] = "application/x-pgn-chess";
            request.HttpMethod = "POST";
            request.ResourcePath = "/my/games/";
            request.MarshallerVersion = 2;
            return request;
        }

        /// <summary>
        /// Gets the singleton instance of this marshaller.
        /// </summary>
        /// <returns>The singleton instance of this marshaller.</returns>
        internal static PutGameRequestMarshaller GetInstance()
        {
            return instance;
        }
    }
}