---
title: "[教材] 版本控制"
author: "114級電機社 (第一屆)"
desc: "電機社有史以來第一次團體行動"
date: 2024-03-08
tags: [教材, 第一屆歷史資料, 中文]
---

> 據說 PalWorld 在開發初期還不知道有 git 這東西，
> 他們每個禮拜都會買一大疊隨身碟來做備份...

## 版本控制

就像 Google 文件的自動儲存，每做一點更動就建立存檔點，
這樣就不怕改了什麼回不去、或什麼搞壞了就回得到上個存檔...

_核心概念其實就是這樣，
好奇你各位再自己去看[維基百科](https://zh.wikipedia.org/zh-tw/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)_

### 概念與專有名詞

> [!NOTE]
> 維基百科的[術語](https://zh.wikipedia.org/zh-tw/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6#%E6%9C%AF%E8%AF%AD)部份有稍微講到

~~_提醒各位英文很重要_~~

1. Repository (Repo)

    儲存庫 / 倉庫。就是整個項目的目錄。

2. Commit

    你建立的每一個版本，叫做一個 Commit。
    一個個 Commit 接起來，可以叫它 Commit Log。_（log：紀錄，不是木材）_

3. Branch

    分支，就像樹上的樹枝從樹幹分出去。

    至於為何需要做分支：
    - 你想要修改目前的 code，但不想直接對目前的 branch 做改動。
    - 這是多人開發的項目，你想要自己先（在新的 branch）把一個功能開發好。

4. Merge Branches

    把一個分支合併（Merge）進另一個分支，讓兩邊做的改動（兩邊的 commit）進到同一個分支。

    但既然是不同的分支，兩邊有不同的改動，那就有可能兩邊會衝突。叫做 Merge Conflict。

    > [!NOTE]
    > 嚴格來說 git_（下面會講到）_有三種做分支處理與合併的方法：`fast forward`、`merge`、`rebase`
    >
    > 這部份初學者大概還不需要知道，有需要再自己查資料嘍

5. Remote

    （中文：遠程主機？）

    在版本控制的世界裡，有時候我們不只會在本機（Local）上作業。
    那為什麼需要遠程（伺服器）來同步？
    - 你在多個裝置上作業，你需要一個伺服器讓你同步進度。
    - 有多個人在這個 Repo 作業，大家需要同步進度。
    - 你想要一個地方做備份，以免硬碟炸掉。
    - ~~你想要一個免費的雲端硬碟。~~

6. Push

    正如其名，Push 就是推送的意思，用來將本地的分支版本推送到遠程 server 並合併。

7. Pull

    相反的，Pull 是用來遠程獲取資料並合併到本地。

8. Fork

    _不是叉子_

    Fork 在這裡是 _把整個 repo 複製下來做修改_ ，
    [維基百科](https://zh.wikipedia.org/zh-tw/%E5%88%86%E5%8F%89_(%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91))翻譯叫「分叉」，
    反正用中文解釋有點難懂。

    通常當我們把一個 repo "fork" 下來，我們想做的事是：
    1. 我想要修改他的原始碼，之後把我做的修改丟回去。
    2. 我想要以它為基底，做出我自己的項目。


## 版本控制軟體

從以前到現在也出現了不少軟體要提供這個功能：

- **Subversion**
- **Git**
- _還有其他的，我就不知道了 :)_

### Git

現在最多人用、最普及的軟體就是 Git。
它功能有很多，但在大部分情況你會用到的就那幾個，詳細參考[下面範例](#參考用指令及範例)。

_順帶一提，他是在 Linux 開發期間為了改善版本控制軟體誕生的 🛐🛐_

## Git 託管平台（Git Hosting Platforms）

剛剛講到 Remote 遠程伺服器的事，在 git 裡要怎麼運用呢？

Git 週邊的生態已經發展得非常蓬勃，我們不需要自己架設 git remote server，
已經有很多存在許久的平台可以幫你管理、儲存 git repo。

1. GitHub

    目前市面上最大的 Git 託管平台，也是我們讓你們註冊的平台。
    我們在 GitHub 上有 [tnfshcec](https://github.com/tnfshcec) 這個組織，可以給你各位社員加入。
    
    _目前微軟收購，也就是說，你逃不過比爾蓋茲的魔掌。_

2. GitLab

    目前 GitHub 佔了這個市場的大半，但 GitLab 就是我們第二個選項了。
    GitLab 除了直接使用官方的平台還可以自架（Self-host），
    本身也大部分開源，或許會是開源軟體開發團隊的好選擇。

    _其實我對它們都不是很熟，但一樣，如果各位有興趣都可以去查 Google。_

3. Bitbucket、Gitea 等其他平台

    這是一個開放的市場！在這裡我們還有很多種選擇，就看各位喜歡那個了。

### GitHub

因為我們最常使用的大概還是 GitHub，這邊稍微介紹一下 GitHub 整體平台。

除了 git 託管，它基本上就是一個社群平台。
你可以追蹤人、追蹤項目、對項目按星星（就是喜歡啦），
這部份因為它會一直變動、在這裡做界面教學也 _十分智障_ ，
這就交給各位自己探索吧。

## 參考用指令及範例

1. Status

```sh
$ git status
```
用來確認目前 git repo 的狀態。
一個檔案可能會是 `untracted`、`unstaged`、`staged`，詳情參考下面。

2. Add / Commit

    新增的檔案的狀態叫 `Untracted`，代表「尚未追蹤」，
    而修改過得檔案狀態叫 `Unstaged`，
    兩者都需要先加入 `Staged` Changes（暫存區？）。
    ```sh
    $ git add [檔案/資料夾]
    ```

    > [!TIP]
    > Add 目前資料夾的所有更變：
    > ```sh
    > $ git add .
    > ```
    >
    > 如果你正在項目的根目錄，這就會加入所有檔案了喔。

    在所有需要提交的 code 已經存在暫存區後，是時候將成果提交到倉庫中了！
    ```sh
    $ git commit -m [訊息/備註]
    ```
    為了避免不知道自己在幹嘛，提交 commit 時會加入備註（commit message，應該叫訊息吧？），
    通常會寫整體改動了什麼、為什麼做改動、或處理了什麼 Issue。

    > [!IMPORTANT]
    > Commit message 可以有多行字，格式大致如下：
    >
    > ```txt numbers
    > 簡略概要
    >
    > 詳細描述
    > 詳細描述
    > ```

    > [!NOTE]
    > 如果你懶的想要寫什麼東西，下面是你可以 _亂打_ 的訊息：<br>
    > **注意如果這不是你自己的個人項目，你最好多想想怎麼寫會比較好。**
    > 
    > ```
    > Added [FILE]
    > Fixed [ISSUE]
    > Deleted [FILE]
    > [Did something] as [Your reason]
    > ```

    如果沒把握自己有沒有傳上去，可以使用
    ```sh
    $ git status
    ```
    來確認目前狀態（是否提交），例如：
    ```sh
    $ git status
    ```
    ```
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
    $ git add .
    $ git commit -m '你媽'
    ```
    ```
    [OOOXXX] 你媽
    X files changed, X insertions(+)
    ```

    ```sh
    $ git status
    nothing to commit (working directory clean)
    ```
    顯示什麼都幹不了後，就是所有更變都提交了

2. Branch

創建新的分支:
```sh
$ git branch [分支名稱] 
```

切換分支:
```sh
$ git checkout [分支名稱] 
```

合併分支:
```sh
$ git merge
```

2. Push

把本機的 Commit 送上 Remote
```sh
git push [遠程主機名] [本地分支名]:[遠程分支名]
# 把 [本地] 推到 [遠程]
```

3. Pull

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