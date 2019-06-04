using Newtonsoft.Json;

namespace drebin_store.Services.Models
{
    public class NotificationKeys
    {
        [JsonProperty(PropertyName = "p256dh")]
        public string P256DH { get; set; }

        public string Auth { get; set; }
    }
}
