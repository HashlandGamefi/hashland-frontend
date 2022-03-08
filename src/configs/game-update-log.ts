export const GameDownloadData = [
  {
    title: "Mobile",
    list: [
      {
        isShow: true,
        imgUrl: "https://cdn.hashland.com/images/android.png",
        application: "Android(APK)",
        downloadLink: "https://cdn.hashland.com/apk/HashWarfare_main_1.5.4.apk",
      },
      {
        isShow: true, // 是否显示该平台
        imgUrl: "https://cdn.hashland.com/images/ios.png", // 该平台图标（正式库）
        application: "App Store", // 该平台名称
        downloadLink: "", // 下载链接，没有则显示 coming soon
      },
      {
        isShow: true,
        imgUrl: "https://cdn.hashland.com/images/googleplay.png",
        application: "Google play",
        downloadLink: "",
      },
    ],
    prompt: "* Mobile users can also experience on NowGG.",
  },
  {
    title: "Desktop",
    list: [
      {
        isShow: true,
        imgUrl: "https://cdn.hashland.com/images/nowg.png",
        application: "NowGG Online",
        downloadLink: "https://now.gg/lp/xyz/5283/hash-warfare/player",
        prompt: "For mobile game developers and gamers",
      },
      {
        isShow: false,
        imgUrl: "https://cdn.hashland.com/images/windows.png",
        application: "Windows",
        downloadLink: "",
      },
      {
        isShow: false,
        imgUrl: "https://cdn.hashland.com/images/macos.png",
        application: "MacOS",
        downloadLink: "",
      },
    ],
  },
];
export const GameUpdateLog = [
  {
    version: "1.5.4",
    update: "07-03-2022",
    log: "Free Server: Free to Play to Earn, lasts 10 days",
  },
  {
    version: "1.4.0",
    update: "21-02-2022",
    log: "Season 3: Summoner level cap 40, Chapter 1-15, lasts 12 days",
  },
  {
    version: "1.2.0",
    update: "21-01-2022",
    log: "Season 2: Summoner level cap 40, Chapter 1-15, lasts 12 days",
  },
  {
    version: "1.1.9",
    update: "25-12-2021",
    log: "Season 1: Summoner level cap 26, Chapter 1-9, lasts 15 days",
  },
  {
    version: "1.1.7",
    update: "18-12-2021",
    log: "Update Chapter 3-9",
  },
  {
    version: "1.1.6",
    update: "16-12-2021",
    log: "Update Chapter 1-2",
  },
];
