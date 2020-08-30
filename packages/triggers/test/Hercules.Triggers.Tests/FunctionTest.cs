namespace Hercules.Triggers.Tests
{
    using System.IO;
    using System.Text;
    using Xunit;
    using Amazon.Lambda.TestUtilities;

    public class FunctionTest
    {
        private static string InvokeWithJson(string json)
        {
            var context = new TestLambdaContext();
            using var ms = new MemoryStream(Encoding.UTF8.GetBytes(json));
            using var outputStream = Function.FunctionHandler(ms, context);
            using var reader = new StreamReader(outputStream);
            return reader.ReadToEnd();
        }

        [Fact(DisplayName = "Display invalid event handled correctly")]
        public void TestFunctionInvalidInputEvent()
        {
            var outputJson = InvokeWithJson("{}");
            Assert.Equal("{\"response\":{}}", outputJson);
        }
    }
}
