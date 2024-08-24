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

我們的文章都放在 `cec/` 資料夾裡。
裡面你會看到很多 `something.md` 的文字檔，一個檔案就是一篇文章。
同時，這個檔案的路徑會直接對應他的網址路徑，例如：`cec/docs/contribution-guide.md` -> `/post/docs/contribution-guide`

至於詳細的介紹，請往下滑：

### 檔案結構

最簡單來說，這就是 Markdown。
但是加了 GFM、一些自訂的擴充功能，還有支援 Svelte 語法。（謝謝 mdsvex 和 remark！）

1. **Frontmatter**（文章資料）

  Frontmatter 是置於 Markdown 內容之前，用於描述檔案附加資料的方式。
  Markdown 的 Frontmatter 是在檔案的最上方、上下用 `---` 包圍的一個區塊，裡面使用 yaml 格式指定資料。
  例如：

  ```md
  ---
  hello: world
  mom: 123kg
  ---

  **Markdown 內容**
  ```

  > [!NOTE]
  > 這邊就不為 yaml 多做介紹，他類似 json，是個資料表示方式，大致使用 `key: value` 的格式。
  > 詳細的規則和格式，就請各位去 Google 一下了。

  而我們網站的文章都可以指定以下的幾個 key，會用於網站各處的顯示。
  （以下也附上他們的資料型態，以 TS 的方式呈現。）

  - `title`: `string`。文章的標題。
  - `author`: `string`。文章的作者。
  - `desc`: `string`。文章的概述或簡介。
  - `date`: `string`。寫作的日期。使用 [ISO 8601](https://zh.wikipedia.org/wiki/ISO_8601) 的日期格式會自動轉成用戶界面的語言。例如 `2024-01-23`。
  - `image`: `string`。文章相關的圖片，會顯示在文章頁面的背景。這邊請填圖片網址。
  - `lang`: `string`。文章的語言。目前我們網站有 `zh-tw`、`en`、`ja` 三種。輸入其他語言可能出現未定義的行為。
  - `tags`: `string[]`。文章的標籤。如果 `lang` 有被指定，會自動加上那個語言的標籤。
  - `pinned`: `boolean`。文章是否釘選。預設 `false`。釘選的文章會在列表最上方顯示。
  - `unlisted`: `boolean`。文章是否不公開顯示。預設 `false`。不公開的文章需要直接使用網址查看，在列表不會出現，搜尋引擎也不會列出（應該）。請注意不公開的文章仍然可以被任何有網址的人檢視。

  > [!TIP]
  > 這邊看不懂就算了，看一下其他文章的 Frontmatter 是怎麼寫的，複製過來改一下就好了。
  > （那樣搞不好還比較快。）

2. **內文**

  內文就是 Markdown 內容了。不清楚的往這邊走：[\[教材\] 基礎Markdown使用教學](/post/material/markdown)

  除了基礎的 Markdown 語法，我們支援、增加了一些另外的語法：表格、 ||暴雷內容|| 、GFM Alert、
  程式區塊的特殊功能（[指定檔案名](/post/test/elements#code)、[指定 highlight](https://shiki.style/packages/transformers#transformermetahighlight)、[diff 註解](https://shiki.style/packages/transformers#transformernotationdiff)）

  另外可以直接使用 Svelte 組件（Components），也可以使用 Svelte 的語法（像是 Svelte 的反應系統）。

  > [!TIP]
  > 內文中可以使用的元素大致都列在 [Elements](/post/test/elements)，[原始碼在這邊](https://github.com/tnfshcec/tnfshcec-web/blob/main/cec/test/elements.md)。

### 進行更改

講完了內容寫什麼，來講講到底要怎麼新增文章、或對現有內容修改。

首先，你可以使用你喜歡的編輯器，或是直接用 GitHub 提供的編輯模式寫作。
因為我們都是 Markdown 文字檔而已，GitHub 的編輯器其實不會太糟，你也能預覽檔案渲染出來會長什麼樣（不過有一兩個我們特定的語法 GitHub 看不懂）。
在 GitHub 編輯完，應該就可以直接 commit、送 PR 了。就免去了其他麻煩。

如果你要在其他地方編輯，你需要在我們的主分支以外的地方編輯。也就是說，你需要建立一個 Fork 或是開新的分支。
（[tnfshcec/tnfshcec-web](https://github.com/tnfshcec/tnfshcec-web) 的 `main` 分支的程式碼會直接部署上 https://www.tnfshcec.com ！
為了避免有意料之外的東西跑出去，我們禁止直接在 `main` 中 commit。）

提醒各位，我們的 Markdown 檔案都放在 `cec/` 資料夾裡，檔案路徑對應他的網址路徑。

### 提交更改

進行你的更改後，照平常的流程 commit 完後，就可以送 PR 提交這些更改了。

送完 PR，有人檢查 OK 之後，就可以合併進主分支，接著就會自動部署上這個網站了！

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
