//-----------------------------------------------------------------------
// <copyright file="AbstractAction.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions
{
    using System.Threading.Tasks;
    using Hercules.Api.Clients;

    /// <summary>
    /// An abstract invokable action.
    /// </summary>
    /// <typeparam name="TRequest">The type of input.</typeparam>
    /// <typeparam name="TResponse">The type of output.</typeparam>
    public abstract class AbstractAction<TRequest, TResponse>
    {
        private ActionContext actionContext;
        private ClientCollection clientCollection;

        /// <summary>
        /// Gets the client collection.
        /// </summary>
        protected ClientCollection Clients => this.clientCollection;

        /// <summary>
        /// Gets the request context.
        /// </summary>
        protected ActionContext Context => this.actionContext;

        /// <summary>
        /// The method that is invoked when this action is invoked.
        /// </summary>
        /// <param name="request">The request object.</param>
        /// <returns>The awaitable task.</returns>
        public abstract Task<TResponse> HandleActionAsync(TRequest request);

        /// <summary>
        /// Emits a log without a newline.
        /// </summary>
        /// <param name="log">The log message.</param>
        protected void Log(string log) => this.actionContext.LambdaContext.Logger.Log(log);

        /// <summary>
        /// Emits a log with a newline.
        /// </summary>
        /// <param name="logLine">The log message.</param>
        protected void LogLine(string logLine) => this.actionContext.LambdaContext.Logger.LogLine(logLine);

        private void SetActionContext(ActionContext context)
        {
            this.actionContext = context;
        }

        private void SetClientCollection(ClientCollection clients)
        {
            this.clientCollection = clients;
        }
    }
}