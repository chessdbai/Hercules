//-----------------------------------------------------------------------
// <copyright file="PutGameAction.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions.MyChess
{
    using System.Threading.Tasks;
    using Hercules.Api.Model.MyChess;

    /// <summary>
    /// An action to store a game in a user's personal database.
    /// </summary>
    public class PutGameAction : AbstractAction<PutGameRequest, PutGameResponse>
    {
        /// <inheritdoc cref="AbstractAction{TReq,TRes}"/>
        public override async Task<PutGameResponse> HandleActionAsync(PutGameRequest request)
        {
            return await Task.FromResult(new PutGameResponse()
            {
            });
        }
    }
}