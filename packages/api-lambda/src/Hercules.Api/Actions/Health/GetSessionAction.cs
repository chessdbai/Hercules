//-----------------------------------------------------------------------
// <copyright file="GetSessionAction.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions.Health
{
    using System.Threading.Tasks;
    using Hercules.Api.Model.Health;

    /// <summary>
    /// An action that simply returns the logged-in users' session information.
    /// </summary>
    public class GetSessionAction : AbstractAction<GetSessionRequest, GetSessionResponse>
    {
        /// <inheritdoc cref="AbstractAction{TReq,TRes}"/>
        public override async Task<GetSessionResponse> HandleActionAsync(GetSessionRequest request)
        {
            return await Task.FromResult(new GetSessionResponse()
            {
                Username = this.Context.Requester,
            });
        }
    }
}