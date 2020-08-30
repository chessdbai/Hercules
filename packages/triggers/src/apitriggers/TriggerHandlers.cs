using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using Newtonsoft.Json.Linq;
using ZugzwangStudy.ApiClient;
using ZugzwangStudy.ApiClient.Model;

namespace apitriggers
{
    public static class TriggerHandlers
    {
        private static IZugzwangStudyApi _api;

        static TriggerHandlers()
        {
            _api = new ZugzwangStudyApiClient(new EnvironmentVariablesAWSCredentials(), StudyApiEndpoint.Prod);
        }
        
        public static async Task<JObject> HandlePostConfirmAsync(string username, ILambdaContext context)
        {
            context.Logger.LogLine($"Registering user {username} in study materials database...");
            try
            {
                var response = await _api.InitializeUserAsync(new InitializeUserRequest()
                {
                    Username = username,
                    InitialGroup = "FreeUsers"
                });
                context.Logger.LogLine($"User {username} successfully registered in study materials database with db ID {response.DatabaseObjectId}.");
            }
            catch (Exception e)
            {
                throw;
            }
            return new JObject();
        }
    }
}