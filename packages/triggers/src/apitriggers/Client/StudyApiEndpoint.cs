namespace ZugzwangStudy.ApiClient
{
    public class StudyApiEndpoint
    {
        public string SigningRegion { get; set; }
        public string Endpoint { get; set; }


        private static StudyApiEndpoint CreateEndpoint(string endpoint)
        {
            return new StudyApiEndpoint()
            {
                SigningRegion = "us-east-2",
                Endpoint = endpoint
            };
        }

        private static readonly StudyApiEndpoint _prod = CreateEndpoint("https://api.app.zugzwang.io/");

        public static StudyApiEndpoint Prod => _prod;
    }
}