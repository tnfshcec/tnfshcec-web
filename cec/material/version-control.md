---
title: "[教材] 版本控制"
author: "114級電機社 (第一屆)"
desc: "電機社有史以來第一次團體行動"
date: 2024-03-08
lang: zh-tw
tags: [教材, 第一屆歷史資料]
---

> 據說 PalWorld 在開發初期還不知道有 git 這東西，
> 他們每個禮拜都會買一大疊隨身碟來做備份...

## 版本控制

就像 Google 文件的自動儲存，每做一點更動就建立存檔點，
這樣就不怕改了什麼回不去、或什麼搞壞了就回得到上個存檔...

_核心概念其實就是這樣，
好奇你各位再自己去看[維基百科](https://zh.wikipedia.org/zh-tw/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)_

## 版本控制軟體

從以前到現在也出現了不少軟體要提供這個功能：

- **Subversion**
- **Git**
- **Mercurial**
- _還有其他非常多種！_

### Git

現在最多人用、最普及的軟體就是 Git。
它功能有很多，但其實大部分情況你會用到的就是那些常用的，以下我們就會依序介紹。

_順帶一提，他是在 Linux 開發期間為了改善版本控制軟體誕生的 🛐_

## Git 託管平台（Git Hosting Platform）

Git 可以透過架設一個遠程（Remote）的伺服器，同步多個裝置上的內容。

以我們社團而言，我們就需要這麼一個伺服器才能讓大家同步進度。

Git 的生態已經發展得非常蓬勃，我們不需要自己架設伺服器，
已經有很多容易使用的平台可以幫你管理、儲存內容。

1. [GitHub](https://github.com/)

   目前市面上最大的 Git 託管平台。

   _目前微軟收購，也就是說，你逃不過比爾蓋茲的魔掌。_

2. [GitLab](https://about.gitlab.com/)

   目前 GitHub 佔了這個市場的大半，但 GitLab 就是我們第二個選項了。
   GitLab 除了直接使用官方的平台還可以自架（Self-host），
   本身也大部分開源，或許會是開源軟體開發團隊的好選擇。

3. [Bitbucket](https://bitbucket.org/)、[Gitea](https://about.gitea.com/) 及 [Gitee](https://gitee.com/) 等其他平台

   當然，在一個開放的市場裡，我們還有很多種選擇，就看各位喜歡哪個了。

### GitHub

因為我們最常使用的大概還是 GitHub，這邊稍微介紹一下 GitHub 整體平台。

我們在 GitHub 上有 [tnfshcec](https://github.com/tnfshcec) 這個組織，可以給你各位社員加入。
同時上面也有[這個網站的原始碼](https://github.com/tnfshcec/tnfshcec-web)、和我們一些奇奇怪怪的項目。

除了 Git 託管，它基本上就是一個社群平台。
你可以追蹤人、追蹤項目、對項目按星星（喜歡），
這個教材上不會一張圖一張圖做界面教學，還請各位自己摸索看看吧。

![github trending](./version-control-assets/github-trending.png "你甚至可以發現 GitHub 的發燒榜，上面列著現在熱門的項目。")

## 概念與專有名詞

以下我們會介紹一些概念以及 Git 指令。

如果各位沒碰過 terminal 終端機，可以參考我們的 [\[教材\] Linux / Unix 實用概念介紹](/post/material/linux-intro)。

> [!NOTE]
> Commit 的時候 Git 需要用你的用戶資料進行處理，
> 他可能會跳出這些訊息：
>
> ```txt nonumbers
> Author identity unknown
>
> *** Please tell me who you are.
>
> Run
>
>   git config --global user.email "you@example.com"
>   git config --global user.name "Your Name"
>
> to set your account's default identity.
> Omit --global to set the identity only in this repository.
> ```
>
> 那麼就照他說的，設定好用戶名以及郵件就好了：
>
> ```sh
> git config --global user.email "you@example.com"
> git config --global user.name "Your Name"
> ```

### Repository (Repo)

儲存庫 / 倉庫。就是整個項目的目錄。

在 Git，使用 `init` 指令可以初始化（initialize）一個 repo，
也就是創建一個 repo 的意思。

```sh
git init [資料夾]
```

如此就會在 _[資料夾]_ 的地方創建一個新的 repo。
不指定資料夾就會在目前的資料夾創建。

### Status（狀態）

一個 repo 可能會有好幾種狀態：沒有變更、有變更過、準備新增變更等。
使用 `status` 指令即可看到目前的狀態。

```sh
git status
```

```txt nonumbers
# 空 repo 的狀態
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

### Add（新增）

做了改動後，在準備紀錄下這個版本前，我們需要先講好這個版本裡要加入什麼東西。

`add` 指令就可以加入你指定的檔案或者資料夾離開 `Untracted`，也就是未追蹤的狀態。

```sh
git add [檔案/資料夾]
```

指定資料夾的意思是讓資料夾內的所有檔案都加入，所以如果你想要一次加入所有檔案，
使用 `.`（目前的資料夾）作為新增的目標就好了。

在新增完檔案後，你應該會看到類似的狀態（用 `status` 指令看！）：

```txt nonumbers
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   mom.txt
```

他就準備好可以 commit 了。

### Commit

你建立的每一個版本，叫做一個 Commit。
一個個 Commit 接起來，可以叫它 Commit Log。_（log：紀錄，不是木材）_

`commit` 指令會帶著目前新增的更動，為目前的 repo 新增一個 commit。

```sh
git commit -m "訊息"
```

> [!IMPORTANT] **Commit 訊息要寫什麼**
>
> _通常寫程式頭痛的不是程式不會寫，是 commit message 不會寫。_
>
> 這邊有幾點給你參考看看：
>
> - 好好描述這個 commit 包含了哪些更動、什麼樣的更動、為什麼要做這些更動。  
>   例如：「add "your mom" into the project due to popular demand」（舉例而已）
> - 如果有需要，我們有一個 commit 訊息的標準格式，
>   詳細內容在[這邊](https://www.conventionalcommits.org/zh-hant/v1.0.0/)（[英文](https://www.conventionalcommits.org/en/v1.0.0/)）  
>   例如：「feat: add "your mom" into the project」（注意前綴，不同前綴有不同意思）
> - 一句話說明不完的，可以在後面幾行進行更詳細的說明。例如：
>
>   ```git-commit nonumbers
>   add "your mom" into the project
>
>   This was made because of issue #69 and popular demand from the community,
>   and includes most features that was requested.
>
>   The implementation was done with function `yourMom()`
>   and calling life support for the maintainer.
>   Please be careful on seeing the actual code, because statistically there is
>   a 99% chance for it to cause a heart attack on a developer.
>
>   We will be accepting suggestions on how it can be improved,
>   however, please don't expect frequent updates to this seemingly useless feature.
>   ```
>
>   第一行就是 commit 標題，接著空一行可以寫下詳細的說明。
>
> 常見的 commit 訊息包括：
>
> - "initial commit"：第一個 commit
> - "add [檔案/功能]": 加了什麼東西
> - "update/remove/revert [什麼東西]"

到目前為止，你已經會建立一個一個版本了！

現在，你可以看看 repo 的狀態（`status`）或 commit 的紀錄（`log`）：

```sh
git status
# On branch master
# nothing to commit, working tree clean

git log
# commit 86a82aa7335b68f27de687989ca5ff8b2ddda9f2 (HEAD -> master)
# Author: You <user@example.com>
# Date:   Tue Aug 27 09:19:01 2029 +0800
#
#     add files
#
# commit 637a40b606b1eec55386239180f6956b7bf0dcf5
# Author: You <user@example.com>
# Date:   Tue Aug 27 09:17:27 2029 +0800
#
#     add mom.txt file
#
```

當然，我們看到的輸出不會完全一樣。但應該是類似的格式。

### Branch（分支）

分支，就像樹上的樹枝從樹幹分出去。

至於為何需要做分支：

- 你想要修改目前的 code，但不想直接對目前的 branch 做改動。
- 這是多人開發的項目，你想要自己先（在新的 branch）把一個功能開發好。

在 Git 使用 `branch` 和 `checkout` 指令可以新增或進入一個分支。

```sh
git branch [分支名稱]    # 新增一個分支
git checkout [分支名稱]  # 進入這個分支
```

另外，不指定分支名稱會列出目前所有的分支。
目前所在的分支會有一個星號（`*`）。

```sh
git branch
# * hello-maam
#   master
```

> [!IMPORTANT] **分支名要取什麼**
>
> 真好，又是取名的問題。
>
> 我們原則上一樣是取一個讓別人看得懂、能代表這個分支的名稱就好了，
> 但是一樣給你幾點參考：
>
> - 空格用 `-` 取代。我們分支名是不包含空格的。例如：「your-mom」
> - 前綴可以加上這個分支的功能或目的。例如：「feat/your-mom」
>
> | 前綴   | 意思 / 目的        |
> | ------ | ------------------ |
> | feat/  | 增加功能 (feature) |
> | chore/ | 不影響功能的改動   |
> | fix/   | 修理 bug           |

### Merge

把一個分支合併（Merge）進另一個分支，讓兩邊做的改動（兩邊的 commit）進到同一個分支。

但既然是不同的分支，兩邊有不同的改動，那就有可能兩邊會衝突。叫做 **Merge Conflict**。

> [!NOTE]
> 嚴格來說 git _（下面會講到）_ 有三種做分支處理與合併的方法：`fast forward`、`merge`、`rebase`
>
> 這部份初學者大概還不需要知道，有需要再自己查資料嘍

在 GitHub 有所謂的 Pull Request (PR)、 GitLab 有 Merge Request (MR)，
都和合併分支的概念相似。
都是將一個分支合併進另一個，將新改動合併進去。

### Remote

_（中文：遠程主機）_

有時候我們可能會在多個裝置上作業，或者有多個人在同個項目上工作，
這時我們總不能一直使用同一臺電腦，或用一個 USB 傳來傳去。

這時候，我們就需要一個遠程的伺服器來進行中央的管理與儲存。
會需要遠程伺服器來同步的原因大致上有這些：

- 你在多個裝置上作業，你需要一個伺服器讓你同步進度。
- 有多個人在這個 Repo 作業，大家需要同步進度。
- 你想要一個地方做備份，以免硬碟炸掉。
- ~~你想要一個免費的雲端硬碟。~~

### Push

正如其名，Push 就是推送的意思，用來將本地的分支版本推送到遠程 server 並合併。

### Pull

相反的，Pull 是用來遠程獲取資料並合併到本地。

### Fork

_不是叉子_

Fork 在這裡是 _把整個 repo 複製下來做修改_ ，
[維基百科](<https://zh.wikipedia.org/zh-tw/%E5%88%86%E5%8F%89_(%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91)>)翻譯叫「分叉」，
反正用中文解釋有點難懂。

通常當我們把一個 repo "fork" 下來，我們想做的事是：

1. 我想要修改他的原始碼，之後把我做的修改丟回去。
2. 我想要以它為基底，做出我自己的項目。

## 參考用指令及範例

1. Init

`init` 就是 Initialize，初始化的意思。

```sh
git init
```

這可以幫你把一個 git repo 準備好，讓你可以開始進行版本管理。

> [!NOTE]
> 通常我們第一個 commit message 會寫
>
> ```txt nonumbers
> Inital commit
> ```

2. Status

```sh
git status
```

用來確認目前 git repo 的狀態。
一個檔案可能會是 `untracted`、`unstaged`、`staged`，詳情參考下面。

3. Add / Commit

   新增的檔案的狀態叫 `Untracted`，代表「尚未追蹤」，
   而修改過得檔案狀態叫 `Unstaged`，
   兩者都需要先加入 `Staged` Changes（暫存區？）。

   ```sh
   git add [檔案/資料夾]
   ```

   > [!TIP]
   > Add 目前資料夾的所有更變：
   >
   > ```sh
   > git add .
   > ```
   >
   > 如果你正在項目的根目錄，這就會加入所有檔案了喔。

   在所有需要提交的 code 已經存在暫存區後，是時候將成果提交到倉庫中了！

   ```sh
   git commit -m [訊息/備註]
   ```

   為了避免不知道自己在幹嘛，提交 commit 時會加入備註（commit message，應該叫訊息吧？），
   通常會寫整體改動了什麼、為什麼做改動、或處理了什麼 Issue。

   > [!IMPORTANT]
   > Commit message 可以有多行字，格式大致如下：
   >
   > ```txt
   > 簡略概要
   >
   > 詳細描述
   > 詳細描述
   > ```

   > [!NOTE]
   > 如果你懶的想要寫什麼東西，下面是你可以 _亂打_ 的訊息：<br> > **注意如果這不是你自己的個人項目，你最好多想想怎麼寫會比較好。**
   >
   > ```txt nonumbers
   > Added [FILE]
   > Fixed [ISSUE]
   > Deleted [FILE]
   > [Did something] as [Your reason]
   > ```

   如果沒把握自己有沒有傳上去，可以使用

   ```sh
   git status
   ```

   來確認目前狀態（是否提交），例如：

   ```sh
   git status
   ```

   ```txt nonumbers
   On branch your-branch
   Your branch is up to date with 'origin/your-branch'.

   Changes not staged for commit:
     (use "git add <file>..." to update what will be committed)
     (use "git restore <file>..." to discard changes in working directory)
           modified:   this-is-a-file.txt
           modified:   this-is-another-file.whatever-the-extension-is

   no changes added to commit (use "git add" and/or "git commit -a")
   ```

   ```sh
   git add .
   git commit -m '你媽'
   ```

   ```txt nonumbers
   [OOOXXX] 你媽
   X files changed, X insertions(+)
   ```

   ```txt nonumbers
   $ git status
   nothing to commit (working directory clean)
   ```

   顯示什麼都幹不了後，就是所有更變都提交了

4. Branch

創建新的分支:

```sh
git branch [分支名稱]
```

切換分支:

```sh
git checkout [分支名稱]
```

合併分支:

```sh
git merge
```

5. Push

把本機的 Commit 送上 Remote

```sh
git push [遠程主機名] [本地分支名]:[遠程分支名]
# 把 [本地] 推到 [遠程]
```

6. Pull

把 Remote 的內容拉進本機，
pull 的指令格式為：

```sh
git pull [遠程主機名] [遠程分支名]:[本地分支名]
# 把 [遠程] 拉進 [本地]
```

> [!NOTE]
> 遠程主機名可以是 URL 或是分支名稱。
>
> 在一般沒有設定的情況下，直接輸入 `git push` 會直接推送到你正在變更的分支。
>
> 直接輸入 `git pull` 會直接拉取你正在變更的分支。
>
> `git pull` 的本質就是 `git fetch` 和 `git merge FETCH_HEAD` 的簡寫。 (English - Simplified)

例如，假設我想將遠程 origin 的 master 分支抓過來與本地的 potato 分支合併，那就可以輸入:

```sh
git pull origin master:potato
```

> [!IMPORTANT]
> 這邊只講了一小部份，剩下的就留給你各位自己 Google 了喔：）
