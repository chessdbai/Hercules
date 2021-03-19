//-----------------------------------------------------------------------
// <copyright file="PutGameResponseUnmarshaller.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client.Marshalling
{
    using System;
    using System.IO;
    using System.Net;
    using Amazon.Runtime;
    using Amazon.Runtime.Internal;
    using Amazon.Runtime.Internal.Transform;
    using Hercules.Api.Model.Admin;
    using Newtonsoft.Json;

    /// <summary>
    /// A response unmarshaller to convert the server response to an InitializeUser response object.
    /// </summary>
    public class PutGameResponseUnmarshaller : JsonResponseUnmarshaller
    {
        private static PutGameResponseUnmarshaller instance = new PutGameResponseUnmarshaller();

        /// <summary>
        /// Gets the singleton.
        /// </summary>
        public static PutGameResponseUnmarshaller Instance
        {
            get
            {
                return instance;
            }
        }

        /// <summary>
        /// Unmarshalls the response from the service to the response class.
        /// </summary>
        /// <param name="context">The unmarshaller context.</param>
        /// <returns>The service response.</returns>
        public override AmazonWebServiceResponse Unmarshall(JsonUnmarshallerContext context)
        {
            string json;
            using var reader = new StreamReader(context.Stream);
            json = reader.ReadToEnd();
            return JsonConvert.DeserializeObject<InitializeUserResponse>(json);
        }

        /// <summary>
        /// Unmarshaller error response to exception.
        /// </summary>
        /// <param name="context">The unmarshaller context.</param>
        /// <param name="innerException">The inner exception.</param>
        /// <param name="statusCode">The status code.</param>
        /// <returns>The thrown exception.</returns>
        public override AmazonServiceException UnmarshallException(JsonUnmarshallerContext context, Exception innerException, HttpStatusCode statusCode)
        {
            ErrorResponse errorResponse = JsonErrorResponseUnmarshaller.GetInstance().Unmarshall(context);
            if (errorResponse.Code != null && errorResponse.Code.Equals("InternalServerError"))
            {
            }

            return new AmazonServiceException(errorResponse.Message, innerException, errorResponse.Type, errorResponse.Code, errorResponse.RequestId, statusCode);
        }

        /// <summary>
        /// Gets the singleton instance of the unmarshaller.
        /// </summary>
        /// <returns>The singleton instance.</returns>
        internal static PutGameResponseUnmarshaller GetInstance()
        {
            return instance;
        }
    }
}