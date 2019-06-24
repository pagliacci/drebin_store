using drebin_store.Services.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using WebPush;

namespace drebin_store.Services
{
    public class WebPushService : IWebPushService
    {
        private readonly WebPushClient _webPushClient;

        public WebPushService(WebPushClient webPushClient)
        {
            _webPushClient = webPushClient;
        }

        public void SendNotification(User user) {
            if (user.NotificationSubscriptionString != null)
            {
                var notificationData = JsonConvert.DeserializeObject<NotificationSubscription>(user.NotificationSubscriptionString);
                var pushSubscription = new PushSubscription(notificationData.Endpoint, notificationData.Keys.P256DH, notificationData.Keys.Auth);

                var payload = new Notification
                {
                    Title = "MGS зовёт!",
                    Actions = new List<Action>
                    {
                        new Action
                        {
                            ActionType = "qwe",
                            Title = "asd"
                        }
                    },
                    Body = "Нет времени объяснять, вот тебе картинка goatse из интернетов!",
                    Dir = "auto",
                    Icon = "https://memepedia.ru/wp-content/uploads/2018/10/goatse-donuts.png",
                    Badge = "https://memepedia.ru/wp-content/uploads/2018/10/goatse-donuts.png",
                    Renotify = true,
                    Lang = "en",
                    RequireInteraction = true,
                    Vibrate = new[] { 200, 100, 200 }
                };

                var subject = "mailto:example@example.com";
                var publicKey = "BFA1LB2pb5WGs8zN5wCdEubKsqvqpCqwGQ9tEjBUBouZ2bzO-4eBOtmt0-a3Oz-BAZqwQO1WMaroK_JdwWiwiMQ";
                var privateKey = "TxI1I9J-pCSiOB5FzKt71J1mZByoUla-Ybnrj3loMaM";
                var vapidDetails = new VapidDetails(subject, publicKey, privateKey);

                _webPushClient.SendNotification(pushSubscription, JsonConvert.SerializeObject(new { notification = payload }), vapidDetails);
            }
        }
    }
}
