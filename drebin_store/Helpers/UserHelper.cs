using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace drebin_store.Helpers
{
    public static class UserHelper
    {
        public static int GetCurrentUserId(this ControllerBase controller)
        {
            return int.Parse(controller.User.FindFirst(ClaimTypes.Name).Value);
        }
    }
}
