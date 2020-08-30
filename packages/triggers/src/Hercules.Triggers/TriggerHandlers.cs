//-----------------------------------------------------------------------
// <copyright file="TriggerHandlers.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Triggers
{
    using System.Threading.Tasks;
    using Amazon.Lambda.Core;
    using Amazon.Runtime;
    using Hercules.Api.Client;
    using Hercules.Api.Model.Admin;
    using Newtonsoft.Json.Linq;

    /// <summary>
    /// Static handler methods.
    /// </summary>
    public static class TriggerHandlers
    {
        private static readonly IHerculesApi ApiClient;

        static TriggerHandlers()
        {
            ApiClient = new HerculesApiClient(new EnvironmentVariablesAWSCredentials(), HerculesApiEndpoint.Prod);
        }

        /// <summary>
        /// A method to handle the post confirm signup step.
        /// </summary>
        /// <param name="username">The username that signed up.</param>
        /// <param name="context">The request context.</param>
        /// <returns>An awaitable task with a JSON object value.</returns>
        public static async Task<JObject> HandlePostConfirmAsync(string username, ILambdaContext context)
        {
            context.Logger.LogLine($"Registering user {username} in study materials database...");
            try
            {
                var response = await ApiClient.InitializeUserAsync(new InitializeUserRequest()
                {
                    Username = username,
                    InitialGroup = "FreeUsers",
                });
                context.Logger.LogLine($"User {username} successfully registered and placed into correct group.");
            }
            catch
            {
                throw;
            }

            return new JObject();
        }
    }
}