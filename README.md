# VC-kungfu

2023年Young Lions Competition 坎城全球青年創意競賽台灣代表隊選拔賽台灣區域賽隊伍，並在當初比賽獲得了台灣區第四名的成績。

## 介紹

我們提出了將肺中空氣結合功夫真氣的構想，製作一款能夠透過網頁遊戲檢測自己肺活量的網頁應用程式（VC Kung Fu）。使用 Web Audio API 來偵測使用者的聲音可否持續，並透過 Firebase 來儲存使用者的資料。並針對不同檢測結果，提供不同的網頁內容，讓使用者能夠了解自己的肺活量狀況。

## 這個專案嘗試了什麼酷東西

* PWA Support -> 可以直接將網頁安裝在手機桌面中，並作為應用程式來執行。
* Web Audio -> 使用 [@vueuse/core](https://vueuse.org/) 封裝的 [Web Audio API](https://www.w3.org/2011/audio/drafts/1WD/WebAudio/) 以作為在專案中的聲音偵測相關工具。
* SPA-based Game -> 整個遊戲都是透過 Vue 加上 CSS 來作為渲染工具，而不是使用 Javascript Game Engine。
* CI -> 透過 [Github Action](https://github.com/features/actions) 做 CI，並且部署到 [Firebase](https://firebase.google.com/) 上。

## Firebase Config 設定

在 .env 裡面設定 firebase 的 config，如下（Vite 只會載入 `VITE_` 前綴的環境變數）：

```bash
VITE_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
VITE_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
VITE_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
VITE_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
VITE_FIREBASE_MEASUREMENT_ID=<YOUR_FIREBASE_MEASUREMENT_ID>
```

可參考專案根目錄的 `.env.example`。

## 開發

```bash
npm install
npm run dev
```

## 程式碼檢查與格式化

```bash
npm run type-check   # 型別檢查
npm run lint         # ESLint（會自動修正）
npm run format       # Prettier 格式化
```

## 部署

本地建置：

```bash
npm run build        # 產出 dist/
```

部署則整合了 CI/CD：只要將程式碼 push 到 `main` branch，GitHub Actions 就會自動建置並部署到 Firebase Hosting 上（開 PR 時會建立 preview channel）。若要手動部署，需安裝 [firebase-tools](https://firebase.google.com/docs/cli) 並執行 `firebase deploy`。

> ⚠️ CI（`action-hosting-deploy`）只會部署 **Hosting**，不會部署 Firestore 安全規則。修改 `firestore.rules` 後，需手動執行 `firebase deploy --only firestore:rules` 才會生效。
