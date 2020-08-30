//-----------------------------------------------------------------------
// <copyright file="CognitoUserClient.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Clients.Users
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Amazon.CognitoIdentityProvider;
    using Amazon.CognitoIdentityProvider.Model;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// A class to use Cognito to interact with registered users.
    /// </summary>
    public class CognitoUserClient : IUserClient
    {
        private const string DatabaseIdAttribute = "custom:directoryId";

        private readonly string userPoolId;
        private readonly IAmazonCognitoIdentityProvider cognito;
        private readonly ILogger<CognitoUserClient> logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="CognitoUserClient" /> class.
        /// </summary>
        /// <param name="cognito">The type of the handler.</param>
        /// <param name="userPoolId">The user pool id.</param>
        /// <param name="logger">The logger.</param>
        public CognitoUserClient(
            IAmazonCognitoIdentityProvider cognito,
            string userPoolId,
            ILogger<CognitoUserClient> logger)
        {
            this.userPoolId = userPoolId;
            this.cognito = cognito;
            this.logger = logger;
        }

        /// <inheritdoc cref="IUserClient" />
        public async Task SetUserDatabaseIdAsync(string username, string databaseId)
        {
            var req = new AdminUpdateUserAttributesRequest()
            {
                Username = username,
                UserAttributes = new List<AttributeType>(new[]
                {
                    new AttributeType()
                    {
                        Name = DatabaseIdAttribute,
                        Value = databaseId,
                    },
                }),
                UserPoolId = this.userPoolId,
            };
            await this.cognito.AdminUpdateUserAttributesAsync(req);
        }

        /// <inheritdoc cref="IUserClient" />
        public async Task<string> GetUserDatabaseIdAsync(string username)
        {
            var req = new AdminGetUserRequest()
            {
                Username = username,
                UserPoolId = this.userPoolId,
            };
            var getUserResponse = await this.cognito.AdminGetUserAsync(req);
            var dbIdAttribute =
                (from att in getUserResponse.UserAttributes where att.Name == DatabaseIdAttribute select att).First();
            return dbIdAttribute.Value;
        }

        /// <inheritdoc cref="IUserClient" />
        public async Task AddUserToGroupAsync(string username, string groupName)
        {
            var req = new AdminAddUserToGroupRequest()
            {
                Username = username,
                UserPoolId = this.userPoolId,
                GroupName = groupName,
            };
            await this.cognito.AdminAddUserToGroupAsync(req);
        }
    }
}