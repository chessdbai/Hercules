//-----------------------------------------------------------------------
// <copyright file="NaturalSearchAction.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Actions.Database
{
    using System.Threading.Tasks;
    using Hercules.Api.Model.Database;

    /// <summary>
    /// An action to handle a natural language search query.
    /// </summary>
    public class NaturalSearchAction : AbstractAction<NaturalSearchRequest, NaturalSearchResponse>
    {
        /// <inheritdoc cref="AbstractAction{TReq,TRes}"/>
        public override async Task<NaturalSearchResponse> HandleActionAsync(NaturalSearchRequest request)
        {
            return await Task.FromResult(new NaturalSearchResponse()
            {
                QueryText = request.SearchQuery.ToUpper(),
                LanguageCode = request.LanguageCode.ToUpper(),
            });
        }
    }
}