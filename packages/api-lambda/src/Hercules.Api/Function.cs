//-----------------------------------------------------------------------
// <copyright file="Function.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Amazon.Lambda.Core;
    using Amazon.Lambda.RuntimeSupport;
    using Hercules.Api.Actions;
    using Hercules.Api.Model;
    using Hercules.Api.Model.Runtime;
    using Newtonsoft.Json;

    /// <summary>
    /// The function entry point.
    /// </summary>
    public class Function
    {
        private static readonly ActionRegistry ActionRegistry = new ActionRegistry();
        private static readonly JsonSerializer JsonSerializer = new JsonSerializer();

        /// <summary>
        /// The main entry point to the application.
        /// </summary>
        /// <param name="args">The execution args.</param>
        /// <returns>An awaitable task.</returns>
        public static async Task Main(string[] args)
        {
            Func<Stream, ILambdaContext, Stream> func = FunctionHandler;
            using (var handlerWrapper = HandlerWrapper.GetHandlerWrapper(func))
            using (var bootstrap = new LambdaBootstrap(handlerWrapper))
            {
                await bootstrap.RunAsync();
            }
        }

        /// <summary>
        /// The main function handler.
        /// </summary>
        /// <param name="input">The input data stream.</param>
        /// <param name="context">The Lambda execution context object.</param>
        /// <returns>The output data stream.</returns>
        /// <exception cref="Exception">An exception on any execution error.</exception>
        public static Stream FunctionHandler(Stream input, ILambdaContext context)
        {
            try
            {
                var runTask = RunFunctionAsync(input, context);
                return runTask.Result;
            }
            catch (AggregateException ex)
            {
                context.Logger.LogLine("Top-level failure handler:");
                context.Logger.LogLine(ex.ToString());
                throw ex.InnerExceptions.First();
            }
        }

        private static async Task<Stream> RunFunctionAsync(Stream input, ILambdaContext context)
        {
            string json;
            using (var reader = new StreamReader(input))
            {
                json = await reader.ReadToEndAsync();
            }

            Exception thrownEx;
            try
            {
                string responseJson = await ActionRegistry.RunActionAsync(json, context);
                var responseBytes = Encoding.UTF8.GetBytes(responseJson);
                return new MemoryStream(responseBytes);
            }
            catch (Exception ex)
            {
                if (ex is AggregateException)
                {
                    thrownEx = ex.InnerException ?? ex;
                }
                else
                {
                    thrownEx = ex;
                }
            }

            var studyException = thrownEx as HerculesApiException
                                 ?? new HerculesApiServiceException("An unknown service exception occurred.", thrownEx);

            var errorInfo = new ErrorData()
            {
                ErrorCode = (int)studyException.StatusCode,
                ErrorMessage = studyException.Message,
                ErrorType = studyException!.GetType()!.Name!,
            };
            var wrappedException = new Exception(JsonConvert.SerializeObject(errorInfo));
            Console.WriteLine(studyException);
            throw wrappedException;
        }
    }
}
