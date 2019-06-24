using drebin_store.Services.Models;

namespace drebin_store.WebModels
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Token { get; set; }

        public decimal DrebinPoints { get; set; }

        public MainQuestStageEnum MainQuestStage { get; set; }

        public int NumberOfQuestInCurrentAct { get; set; }

        public bool BriefingPassed { get; set; }

        public bool CanManageUsers { get; set; }

        public bool CanManageOrders { get; set; }

        public bool CanManageProducts { get; set; }

        public bool HasNotificationSubscription { get; set; }
    }
}
