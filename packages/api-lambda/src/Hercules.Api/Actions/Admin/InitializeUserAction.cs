//-----------------------------------------------------------------------
// <copyright file="InitializeUserAction.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions.Admin
{
    using System.Threading.Tasks;
    using Hercules.Api.Model.Admin;

    /// <summary>
    /// An action taken when a user is first registered to put them in the correct group and set up their database id.
    /// </summary>
    public class InitializeUserAction : AbstractAction<InitializeUserRequest, InitializeUserResponse>
    {
        /// <inheritdoc cref="AbstractAction{TReq,TRes}"/>
        public override async Task<InitializeUserResponse> HandleActionAsync(InitializeUserRequest request)
        {
            await this.Clients.UserClient.AddUserToGroupAsync(request.Username, request.InitialGroup);
            return new InitializeUserResponse();
        }
    }
}