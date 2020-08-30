using System;
using System.IO;
using System.Net;
using Amazon.Runtime;
using Amazon.Runtime.Internal;
using Amazon.Runtime.Internal.Transform;
using Newtonsoft.Json;

namespace ZugzwangStudy.ApiClient.Model.Marshalling
{
    public class InitializeUserResponseUnmarshaller : JsonResponseUnmarshaller
    {
        /// <summary>
        /// Unmarshaller the response from the service to the response class.
        /// </summary>  
        /// <param name="context"></param>
        /// <returns></returns>
        public override AmazonWebServiceResponse Unmarshall(JsonUnmarshallerContext context)
        {
            string json;
            using (var reader = new StreamReader(context.Stream))
            {
                json = reader.ReadToEnd();
            }
            return JsonConvert.DeserializeObject<InitializeUserResponse>(json);
        }

        /// <summary>
        /// Unmarshaller error response to exception.
        /// </summary>  
        /// <param name="context"></param>
        /// <param name="innerException"></param>
        /// <param name="statusCode"></param>
        /// <returns></returns>
        public override AmazonServiceException UnmarshallException(JsonUnmarshallerContext context, Exception innerException, HttpStatusCode statusCode)
        {
            ErrorResponse errorResponse = JsonErrorResponseUnmarshaller.GetInstance().Unmarshall(context);
            if (errorResponse.Code != null && errorResponse.Code.Equals("InternalServerError"))
            {
                
            }
            
            
            return new ZugzwangStudyApiException(errorResponse.Message, innerException, errorResponse.Type, errorResponse.Code, errorResponse.RequestId, statusCode);
        }

        private static InitializeUserResponseUnmarshaller _instance = new InitializeUserResponseUnmarshaller();        

        internal static InitializeUserResponseUnmarshaller GetInstance()
        {
            return _instance;
        }

        /// <summary>
        /// Gets the singleton.
        /// </summary>  
        public static InitializeUserResponseUnmarshaller Instance
        {
            get
            {
                return _instance;
            }
        }

    }
}