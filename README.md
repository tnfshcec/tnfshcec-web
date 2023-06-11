# tnfshcec-web

## 安裝 & 使用

0. 確保 [NodeJS](https://nodejs.org) （和 npm）已經安裝。
1. `git clone` 後，`cd tnfshcec-web`。
2. 使用 `npm install` 下載 dependencies。
3. `npm run dev` 啟動 local 伺服器。

Local 伺服器啟動後，每次檔案儲存網頁即會自動重載。

## 架設

`npm run build` 將生成網站頁面，目前使用靜態網頁形式。
bulid之後 `npm run preview` 檢視生成檔案。

因為（目前）沒有後端在運作，更改頁面必須直接修改檔案；
儲存文章的地方在 `cec/` 中，一個 `.md`/`.svelte.md` 檔即為一篇文。

每次push會觸發 Github Workflow ，會生成網頁至 Github Pages （demo: https://eggrror404.github.io/tnfshcec-web)
