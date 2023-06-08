# VC-kungfu

2023年Young Lions Competition 坎城全球青年創意競賽台灣代表隊選拔賽台灣區域賽隊伍，並在當初比賽獲得了台灣區第四名的成績。

## 介紹

我們提出了將肺中空氣結合功夫真氣的構想，製作一款能夠透過網頁遊戲檢測自己肺活量的網頁應用程式（VC Kung Fu）。使用 Web Audio API 來偵測使用者的聲音可否持續，並透過 Firebase 來儲存使用者的資料。並針對不同檢測結果，提供不同的網頁內容，讓使用者能夠了解自己的肺活量狀況。

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