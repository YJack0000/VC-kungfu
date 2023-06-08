# VC-kungfu

2023年Young Lions Competition 坎城全球青年創意競賽台灣代表隊選拔賽台灣區域賽隊伍，並在當初比賽獲得了台灣區第四名的成績。

## 介紹

我們提出了將肺中空氣結合功夫真氣的構想，製作一款能夠透過網頁遊戲檢測自己肺活量的網頁應用程式（VC Kung Fu）。使用 Web Audio API 來偵測使用者的聲音可否持續，並透過 Firebase 來儲存使用者的資料。並針對不同檢測結果，提供不同的網頁內容，讓使用者能夠了解自己的肺活量狀況。

## Firebase Config 設定

在`src/firebase.js`中設定firebase config

```javascript
export const firebaseConfig = {
    // your firebase config
}
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