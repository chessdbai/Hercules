//-----------------------------------------------------------------------
// <copyright file="ClientCollection.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Clients
{
    using System;
    using Amazon;
    using Amazon.CognitoIdentityProvider;
    using Amazon.Runtime;
    using Hercules.Api.Clients.Users;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// A class containing the clients.
    /// </summary>
    public class ClientCollection
    {
        private readonly AWSCredentials creds;
        private readonly RegionEndpoint regionEndpoint;

        private readonly Lazy<IUserClient> userClientLazy;
        private readonly ILoggerFactory loggerFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientCollection" /> class.
        /// </summary>
        public ClientCollection()
            : this(new EnvironmentVariablesAWSCredentials(), RegionEndpoint.GetBySystemName(Environment.GetEnvironmentVariable("AWS_REGION")))
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientCollection" /> class.
        /// </summary>
        /// <param name="creds">Credentials.</param>
        /// <param name="region">AWS Region.</param>
        public ClientCollection(AWSCredentials creds, RegionEndpoint region)
        {
            this.creds = creds;
            this.regionEndpoint = region;

            this.userClientLazy = new Lazy<IUserClient>(this.UserClientFactory);
            this.loggerFactory = this.CreateLoggerFactory();
        }

        /// <summary>
        /// Gets the user management client.
        /// </summary>
        public IUserClient UserClient => this.userClientLazy.Value;

        private static string UserPoolId => Environment.GetEnvironmentVariable("USER_POOL_ID");

        /// <summary>
        /// Creates a logger instance.
        /// </summary>
        /// <typeparam name="T">Type of logger.</typeparam>
        /// <returns>The logger instance.</returns>
        public ILogger<T> CreateLogger<T>() => this.loggerFactory.CreateLogger<T>();

        private IUserClient UserClientFactory()
        {
            var cognito = new AmazonCognitoIdentityProviderClient(this.creds, this.regionEndpoint);
            var cognitoLogger = this.loggerFactory.CreateLogger<CognitoUserClient>();
            return new CognitoUserClient(cognito, UserPoolId, cognitoLogger);
        }

        private ILoggerFactory CreateLoggerFactory() => LoggerFactory.Create(builder =>
        {
            builder.AddFilter("Microsoft", LogLevel.Warning)
                .AddFilter("System", LogLevel.Warning)
                .AddFilter("api", LogLevel.Information)
                .AddConsole();
            builder.AddConsole();
        });
    }
}