//-----------------------------------------------------------------------
// <copyright file="HandlerDelegate.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions
{
    using System;
    using System.Reflection;
    using System.Threading.Tasks;
    using Hercules.Api.Clients;
    using Newtonsoft.Json;

    /// <summary>
    /// A class to format and invoke input and outputs to actions
    /// in the correct manner.
    /// </summary>
    public class HandlerDelegate
    {
        private readonly TypeInfo handlerType;
        private readonly Type requestType;
        private readonly Type responseType;
        private readonly Func<object> actionFactory;
        private readonly Action<object, ClientCollection, ActionContext> contextSetter;
        private readonly Func<object, string, Task<string>> runActionMethod;

        /// <summary>
        /// Initializes a new instance of the <see cref="HandlerDelegate" /> class.
        /// </summary>
        /// <param name="handlerType">The type of the handler.</param>
        public HandlerDelegate(Type handlerType)
        {
            this.handlerType = handlerType.GetTypeInfo();
            var genericTypes = this.handlerType!.BaseType!.GetGenericArguments();
            this.requestType = genericTypes[0];
            this.responseType = genericTypes[1];
            this.actionFactory = this.CreateActionFactory();
            this.contextSetter = this.CreateSetContextFunc();
            this.runActionMethod = this.CreateAsyncInvokeFunc();
        }

        /// <summary>
        /// Runs this action with the input json.
        /// </summary>
        /// <param name="inputJson">The input json.</param>
        /// <param name="clients">The client collection.</param>
        /// <param name="context">The context.</param>
        /// <returns>An awaitable task with the response JSON.</returns>
        public async Task<string> RunActionAsync(string inputJson, ClientCollection clients, ActionContext context)
        {
            var action = this.actionFactory();
            this.contextSetter(action, clients, context);
            return await this.runActionMethod(action, inputJson);
        }

        private Func<object> CreateActionFactory()
        {
            var constructor = this.handlerType.GetConstructor(new Type[0] { });
            return () => constructor.Invoke(new object[0]);
        }

        private Action<object, ClientCollection, ActionContext> CreateSetContextFunc()
        {
            var setClientMethod =
                this.handlerType!.BaseType!.GetMethod("SetClientCollection", BindingFlags.Instance | BindingFlags.NonPublic);
            var setLambdaContext =
                this.handlerType!.BaseType!.GetMethod("SetActionContext", BindingFlags.Instance | BindingFlags.NonPublic);
            return (action, clientCollection, actionContext) =>
                {
                    setClientMethod!.Invoke(action, new object[] { clientCollection });
                    setLambdaContext!.Invoke(action, new object[] { actionContext });
                };
        }

        private Func<object, string, Task<string>> CreateAsyncInvokeFunc()
        {
            var runActionMethodInfo =
                this.handlerType.GetMethod("HandleActionAsync", BindingFlags.Public | BindingFlags.Instance);

            return async (action, inputJson) =>
            {
                var request = JsonConvert.DeserializeObject(inputJson, this.requestType);
                Task task = (Task)runActionMethodInfo!.Invoke(
                    action,
                    new[] { request, });
                await task!.ConfigureAwait(false);
                return JsonConvert.SerializeObject(((dynamic)task).Result);
            };
        }
    }
}