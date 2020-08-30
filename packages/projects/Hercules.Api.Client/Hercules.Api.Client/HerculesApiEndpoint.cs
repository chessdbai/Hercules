//-----------------------------------------------------------------------
// <copyright file="HerculesApiEndpoint.cs" company="ChessDB.AI">
// MIT Licensed.
// </copyright>
//-----------------------------------------------------------------------

namespace Hercules.Api.Client
{
    /// <summary>
    /// A deployed endpoint of the HerculesApi.
    /// </summary>
    public class HerculesApiEndpoint
    {
        private static readonly HerculesApiEndpoint ProdEndpoint = CreateEndpoint("https://api.chessdb.ai/");

        /// <summary>
        /// Gets the primary production endpoint of the Hercules API.
        /// </summary>
        public static HerculesApiEndpoint Prod => ProdEndpoint;

        /// <summary>
        /// Gets or sets the signing region.
        /// </summary>
        public string SigningRegion { get; set; }

        /// <summary>
        /// Gets or sets the endpoint.
        /// </summary>
        public string Endpoint { get; set; }

        private static HerculesApiEndpoint CreateEndpoint(string endpoint)
        {
            return new HerculesApiEndpoint()
            {
                SigningRegion = "us-east-2",
                Endpoint = endpoint,
            };
        }
    }
}