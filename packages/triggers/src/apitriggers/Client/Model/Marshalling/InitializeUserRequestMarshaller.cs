using System;
using System.Globalization;
using System.IO;
using System.Text.Json.Serialization;
using Amazon.Runtime;
using Amazon.Runtime.Internal;
using Amazon.Runtime.Internal.Transform;
using Newtonsoft.Json;
using ThirdParty.Json.LitJson;

namespace ZugzwangStudy.ApiClient.Model.Marshalling
{
    public class InitializeUserRequestMarshaller : IMarshaller<IRequest, InitializeUserRequest> , IMarshaller<IRequest,AmazonWebServiceRequest>
    {
        /// <summary>
        /// Marshaller the request object to the HTTP request.
        /// </summary>  
        /// <param name="input"></param>
        /// <returns></returns>
        public IRequest Marshall(AmazonWebServiceRequest input)
        {
            return this.Marshall((InitializeUserRequest)input);
        }

        /// <summary>
        /// Marshaller the request object to the HTTP request.
        /// </summary>  
        /// <param name="publicRequest"></param>
        /// <returns></returns>
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
        private static InitializeUserRequestMarshaller _instance = new InitializeUserRequestMarshaller();        

        internal static InitializeUserRequestMarshaller GetInstance()
        {
            return _instance;
        }

        /// <summary>
        /// Gets the singleton.
        /// </summary>  
        public static InitializeUserRequestMarshaller Instance
        {
            get
            {
                return _instance;
            }
        }

    }
}