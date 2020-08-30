//-----------------------------------------------------------------------
// <copyright file="ActionRegistry.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Amazon.Lambda.Core;
    using Hercules.Api.Actions.Admin;
    using Hercules.Api.Actions.Database;
    using Hercules.Api.Actions.Health;
    using Hercules.Api.Clients;
    using Hercules.Api.Model.Runtime;
    using Newtonsoft.Json;

    /// <summary>
    /// A class to store all known actions.
    /// </summary>
    public class ActionRegistry
    {
        private static readonly Dictionary<string, HandlerDelegate> Handlers;
        private static readonly ClientCollection ClientCollection;

        static ActionRegistry()
        {
            Handlers = new Dictionary<string, HandlerDelegate>();
            Handlers.Add("GetSession", new HandlerDelegate(typeof(GetSessionAction)));
            Handlers.Add("InitializeUser", new HandlerDelegate(typeof(InitializeUserAction)));
            Handlers.Add("NaturalSearch", new HandlerDelegate(typeof(NaturalSearchAction)));
            ClientCollection = new ClientCollection();
        }

        /// <summary>
        /// Runs an action.
        /// </summary>
        /// <param name="input">The input to the action.</param>
        /// <param name="context">The request context.</param>
        /// <returns>An awaitable task with the action output.</returns>
        public async Task<string> RunActionAsync(string input, ILambdaContext context)
        {
            var requestJson = JsonConvert.DeserializeObject<ApiRequestJson>(input);
            var actionContext = new ActionContext()
            {
                Requester = requestJson.Requester,
                RequestId = requestJson.RequestId,
                LambdaContext = context,
            };
            var actionDelegate = Handlers[requestJson.ApiName];
            string json = requestJson.Input;
            if (requestJson.InputObject != null)
            {
                json = JsonConvert.SerializeObject(requestJson.InputObject);
                context.Logger.LogLine($"Using input from InputObject instead of Input.");
            }

            context.Logger.LogLine($"Routing request to handler {requestJson.ApiName} with input:");
            context.Logger.LogLine(json);
            return await actionDelegate.RunActionAsync(json, ClientCollection, actionContext);
        }
    }
}