# VC-kungfu

2023年Young Lions Competition 坎城全球青年創意競賽台灣代表隊選拔賽台灣區域賽隊伍，並在當初比賽獲得了台灣區第四名的成績。

## 介紹

我們提出了將肺中空氣結合功夫真氣的構想，製作一款能夠透過網頁遊戲檢測自己肺活量的網頁應用程式（VC Kung Fu）。使用 Web Audio API 來偵測使用者的聲音可否持續，並透過 Firebase 來儲存使用者的資料。並針對不同檢測結果，提供不同的網頁內容，讓使用者能夠了解自己的肺活量狀況。

## 這個專案嘗試了什麼酷東西

* PWA Support -> 可以直接將網頁安裝在手機桌面中，並作為應用程式來執行。
* Web Audio -> 封裝 [Web Audio API](https://www.w3.org/2011/audio/drafts/1WD/WebAudio/) 以作為在專案中的聲音偵測相關工具。
* SPA-based Game -> 整個遊戲都是透過 Vue 加上 CSS 來作為渲染工具，而不是使用 Javascript Game Engine。

## Firebase Config 設定

在 .env 裡面設定 firebase 的 config，如下：

```bash
FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
FIREBASE_MEASUREMENT_ID=<YOUR_FIREBASE_MEASUREMENT_ID>
```

## 開發

```bash
npm install
npm run dev
```

## 部署

```bash
npm run build
npm run deploy
```
另外有整合 CI/CD，只要將程式碼 push 到 master branch，就會自動部署到 firebase hosting 上。
