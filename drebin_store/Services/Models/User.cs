namespace drebin_store.Services.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public decimal DrebinPoints { get; set; }

        public MainQuestStageEnum MainQuestStage { get; set; }

        //public string NotificationSubscriptionString { get; set; }

        // Could be moved to permissions entity

        public bool CanManageUsers { get; set; }

        public bool CanManageOrders { get; set; }

        public bool CanManageProducts { get; set; }
    }
}
