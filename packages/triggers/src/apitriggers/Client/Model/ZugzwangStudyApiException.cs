using System;
using System.Net;
using System.Runtime.Serialization;
using Amazon.Runtime;

namespace ZugzwangStudy.ApiClient.Model
{
    [Serializable]
    public class ZugzwangStudyApiException : AmazonServiceException
    {

        public ZugzwangStudyApiException(
            string message,
            ErrorType errorType,
            string errorCode,
            string requestId,
            HttpStatusCode statusCode)
            : base(message, errorType, errorCode, requestId, statusCode)
        {
        }
        
        
        public ZugzwangStudyApiException(
            string message,
            Exception innerException,
            ErrorType errorType,
            string errorCode,
            string requestId,
            HttpStatusCode statusCode)
            : base(message, innerException, errorType, errorCode, requestId, statusCode)
        {
        }

    }
}