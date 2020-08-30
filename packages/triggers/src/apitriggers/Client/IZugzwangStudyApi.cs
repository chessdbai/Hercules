using System.Threading.Tasks;
using ZugzwangStudy.ApiClient.Model;

namespace ZugzwangStudy.ApiClient
{
    public interface IZugzwangStudyApi
    {
        Task<InitializeUserResponse> InitializeUserAsync(InitializeUserRequest request);
    }
}