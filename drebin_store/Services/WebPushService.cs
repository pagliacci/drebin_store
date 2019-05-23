using WebPush;

namespace drebin_store.Services
{
    public class WebPushService
    {
        private readonly WebPushClient _webPushClient;

        WebPushService(WebPushClient webPushClient)
        {
            _webPushClient = webPushClient;
        }

//  {
//    "endpoint": "https://fcm.googleapis.com/fcm/send/dbDP-ZHtEW4:APA91bFfyOgjPCfY5WwV31iAhunrfscAZF9v_CxsB9XhgrhOe5Kpi45pCrI-wnfaIB7laCpj8BYd07Er4VoLzLrfBvGJ8pOJVwZxFZpXmXCL-JIXnLhYP2bkz4pUIXHlfEu3XZpkm0tX",
//    "expirationTime": null,
//    "keys": {
//        "p256dh": "BN_vv5ayTqq0Xsj1ItJ1RiQzMveLX2cLJZsfa3elyk02YRXdPxf4bkaHONZ1OaNXBHoMsLY55qbvbDzYhG0ivW0",
//        "auth": "P6ZvGv_5Ui5ssjN-qK7icw"
//    }
//  }

    void SendNotification() {
            //_webPushClient.SendNotification
        }
    }
}
