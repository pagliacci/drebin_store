﻿namespace drebin_store.WebModels
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Token { get; set; }

        public decimal DrebinPoints { get; set; }

        public MainQuestStageEnumDto MainQuestStage { get; set; }

        public bool CanManageUsers { get; set; }

        public bool CanManageOrders { get; set; }

        public bool CanManageProducts { get; set; }
    }
}
