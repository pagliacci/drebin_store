using Newtonsoft.Json;
using System.Collections.Generic;

namespace drebin_store.Services.Models
{
    public class Notification
    {
        public string Title { get; set; }

        public List<Action> Actions { get; set; }

        public string Body { get; set; }

        public string Dir { get; set; }

        public string Icon { get; set; }

        public string Badge { get; set; }

        public string Lang { get; set; }

        public bool Renotify { get; set; }

        public bool RequireInteraction { get; set; }

        public long Tag { get; set; }

        public int[] Vibrate { get; set; }

        public Data Data { get; set; }
    }

    public class Action
    {
        [JsonProperty(PropertyName = "action")]
        public string ActionType { get; set; }

        public string Title { get; set; }
    }

    public class Data
    {
        public string Url { get; set; }
    }
}
//{
//    "notification": {
//        "title": "MGS зовёт!",
//        "actions": [
//            {
//                "action": "open_codec",
//                "title": "Open codec"
//            }
//        ],
//        "body": "Нет времени объяснять, вот тебе картинка goatse из интернетов!",
//        "dir": "auto",
//        "icon": "https://memepedia.ru/wp-content/uploads/2018/10/goatse-donuts.png",
//        "badge": "https://memepedia.ru/wp-content/uploads/2018/10/goatse-donuts.png",
//        "lang": "en",
//        "renotify": true,
//        "requireInteraction": true,
//        "tag": 926796012340920300,
//        "vibrate": [
//            100,
//            100,
//            100,
//            100,
//            100,
//            100,
//            100
//        ],
//        "data": {
//            "url": "https://twitter.com/statuses/926796012340920321",
//            "created_at": "Sat Nov 04 12:59:23 +0000 2017",
//            "favorite_count": 0,
//            "retweet_count": 0
//        }
//    }
//}