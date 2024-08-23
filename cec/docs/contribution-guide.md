---
title: "[文檔] 電機社網頁貢獻指南"
author: "114級電機社 (第一屆) - EGRO"
desc: "為了社團 🫡🫡"
date: 2024-08-24
lang: zh-tw
---

這個網站是由 114 級電機社一手打造，為了避免網管~~再次~~成為失傳技藝，
本文檔會盡力對如何進行更新、改動文章內容，以至於貢獻程式碼進行紀錄與提供方向。

但這不會手把手教你如何對開源專案進行貢獻，如果有這需求，請洽 [\[教材\] Open Source](/post/material/open-source)。

> [!NOTE]
> 我們的 repo 在 https://github.com/tnfshcec/tnfshcec-web  
> 目前仍然由 114 級社員進行管理。

## 項目概覽

```txt nonumbers
📁 cec —— 文章 / 教材儲存位置
📁 src —— 網站主要程式內容
📁 static —— 網站靜態內容（如圖片）
📁 tests —— 網站端對端（End-to-End）測試
📁 tnfshcec.inlang —— 多語言工具 Inlang 設定檔
LICENSE
README.md
package.json
其他設定檔...
```

> [!NOTE]
> 目前我們的端對端測試其實也沒什麼東西，就只有單純測試該有的頁面在不在而已。
>
> 如果你有什麼想法，歡迎來和我們討論！

## 新增、更新文章

### 檔案結構

最簡單來說，這就是 Markdown。
但是加了 GFM、一些自訂的擴充功能，還有支援 Svelte 語法。（謝謝 mdsvex 和 remark！）

1. **FrontMatter**（文章資料）

2. **內文**

> [!TIP]
> 內文中可以使用的元素大致都列在 [Elements](/post/test/elements)，[原始碼在這邊](https://github.com/tnfshcec/tnfshcec-web/blob/main/cec/test/elements.md)。

### 進行更改

<!--建立 Fork-->

### 提交更改

## 貢獻、改動網頁本身

目前本網站使用 Svelte、Tailwind、mdsvex、Inlang 等前端工具製成，並透過 GitHub Actions 和 Pages 進行佈署與架設。
這些工具對我們都至關重要，每個都是網站的核心部件。讓我們感謝 JavaScript 與網頁開發社群的活躍與創新，讓我們能如此簡單的建造出非常好的一個網站 🙏

這些工具可能你沒聽過、不會用、或不是很懂，這都沒關係。
你可以針對你理解的部份進行更新就好，或是它們都提供了很好的文檔與教育內容，
或許在讀過之後，你的知識庫又增加了一項實用的工具啦！

> [!NOTE]
> 題外話，在我們這個網站裡真的用了蠻多前端的函式庫、工具，許多程式碼就單純是以它們為基礎，運用這些工具。
> 或許*這項目沒什麼技術含量吧*，但這確實讓開發過程變得順利、讓開發不須大費周章。
> ~~然後這東西也已經寫進我的學習歷程了~~
>
> 讓我們再次感謝 JS 和開源生態對網頁開發的影響 🙏

### 你需要的技能

1. 網頁前端技能
2. [TypeScript](https://www.typescriptlang.org)
3. [Svelte](https://svelte.dev)、[SvelteKit](https://kit.svelte.dev)
4. [Tailwind](https://tailwindcss.com)

還有其他許多的組件庫、函式庫，如以下：

- [Bits UI](https://bits-ui.com) - 組件庫
- [Inlang / ParaglideJS](https://inlang.com) - 提供 i18n （多語言）
- [mdsvex](https://mdsvex.pngwn.io/) - 提供 Svelte 中的 Markdown 讀取
- [Unplugin Icons](https://github.com/unplugin/unplugin-icons) - 提供圖標

這邊就看你需要什麼了

### 進行更改、測試功能

### 提交更改
