---
title: "[教材] 基礎Markdown使用教學"
author: "114級電機社 (第一屆) - HeyLoon"
desc: "在🐔社出生的馬克大奧聖經🫶"
date: 2024-03-10
lang: zh-tw
tags: [教材, 第一屆歷史資料]
---

> 放下Word，立地成材

## Markdown 是什麼？

馬克大奧，一種非常輕的標記語言，與一般程式語言不同的是，他的重點在於直接的「表達」，非常快速的寫出和讀出文檔。

為什麼這麼說呢？  
因為它當初設計就是用來在只有**純文字**的環境下使用的。像是 email、社群貼文這類，沒辦法直接選擇粗體、沒有辦法強調字眼的地方。

所以我們會用 `**` 或 `__` 包圍文字代表強調、前綴加個 `-` 或 `+` 表示清單。

Markdown 就是這樣的概念。
在有了這些幾乎是約定俗成的習慣後，John Gruber [在一篇文章中](https://daringfireball.net/projects/markdown/)
整理、標準化並命名了這套系統，就變成了我們現在的 Markdown。

> [!TIP]
> 所以 Markdown 不是什麼可以下載的軟體，請不要去 Google 找「Markdown windows 10 免費下載」謝謝。

Markdown 誕生的目的是**易寫**和**易讀**，畢竟你在純文字的情境下也能很清楚的知道一篇文章的架構（像標題、強調等）。

在現代的開發工具的幫助下，
使用 Markdown 寫出來的文檔可以非常簡單的導出成 `docx`、`html`、`pdf`，甚至是電子閱讀器使用的 `epub`。

不少服務 / 軟體也使用這套規則用來表示文字的架構，
在 [Discord](https://discord.com/) 的聊天室中可以直接使用，Reddit、Facebook 等地方也都（大概）可以（在某些地方）使用。

![DC使用效果圖](./markdown-assets/DC.png "▲ 在 Discord 中使用 Markdown")

在 Markdown 被提出來後，又有了許多**擴展**，它們為 Markdown 增加功能、讓 Markdown 更加易讀，但**擴展**出來的功能可能就**不是每套軟體都支援**。

最常見的擴展肯定就是 GFM (GitHub Flavored Markdown) 了。不過在這邊我們大致上不會特別細分哪些是核心語法、哪些是擴展語法，只把常見（常用）的語法列出來。
（最後第 10. 點就是那些不常見、比較特定的語法，必要時再使用即可，否則有些功能在某些軟體沒辦法支援。）

> [!NOTE]
> 私心推薦 Markdown 的寫作平台
>
> 它們會將 Markdown 語法顯示為一般的附文本（rich text）模式，就像你在 Word 會看到的那樣。
>
> - StackEdit - ⭐⭐⭐⭐，免費，Chrome應用程式，線上同步
> - Notion - ⭐⭐⭐⭐，部分免費，算有名的筆記軟體
> - dillinger - ⭐⭐⭐⭐，跟`StackEdit`差不多，同步方式更多
> - AppFlowy - ⭐⭐⭐⭐，開源免費，多平台
> - typora - ⭐⭐⭐，收費，多平台
> - Obsidian - ⭐⭐⭐，大部分免費，多平台
> - VSCode - ⭐⭐，免費，要裝插件才勉強比較好用
>
> 當然，任何文字編輯器都能使用！
> 這就是純文字格式的好處👍
>
> 有點（沒）用的書： [了不起的Markdown](https://www.books.com.tw/products/CN11667983)

## Markdown，啟動！

理所當然的，Markdown 的後綴是 **_.md_**。
許多網站 / 軟體都支援 Markdown，為求方便，這次使用即時預覽 `typora` 作介紹。

### 1. Markdown 的標題

Markdown 共有**六級**標題，`#` 的數量即代表1~6級標題，例如：

```markdown
# 一級標題

## 二級標題

### 三級標題

#### 四級標題

##### 五級標題

###### 六級標題
```

顯示的效果就是：
![標題效果圖](./markdown-assets/title.png)

> [!TIP]
> 在 `#` 以後務必要加空白鍵，否則無法正常顯示  
> 另外在打 `--` 及 `==` 時會將上方文字分別自動調整為1級及2級標題，部分軟體及網站不支援不建議使用  
> 額外補充，大部分時候3~4級就已經跟一般文字大小差不多了，建議做為小標

### 2. Markdown 的段落

一開始使用Markdown時我也有這樣的疑惑，到底怎樣才算"換行"  
在Markdown裡換行有兩種方式，第一種是在**文字尾端加上兩個空白鍵**  
第二種是直接換兩行開啟新段落，例如：
![段落效果圖](./markdown-assets/line.png)

#### 2.1 Markdown 的字體

跟Word一樣，Markdown可以使用以下語法改變字體樣式：

<!-- prettier-ignore -->
```markdown
*斜體*
_斜體_
**粗體**
__粗體__
***粗斜體***
___粗斜體___
~~刪除~~
```

> [!NOTE]
> 通常斜體會使用 `_斜體_`、粗體使用 `**粗體**`。
> 粗斜體使用 `**_粗斜體_**`。
>
> 這沒有硬性規定，也不是只有這種用法，
> ~~但我的格式化工具會直接把它改成那樣~~

### 3. Markdown 的列表

Markdown有**有序列表**和**無序列表**

#### 3.1 有序列表

**有序列表**用數字加上 `.` 來使用，例如：

```markdown
1. 第一項
2. 第二項
3. 第三項
```

顯示結果同上，不額外展示

> [!TIP]
> 無論有序還是無序，請務必在標點後加上空白鍵！  
> 有序列表大部分時候只支援數字，使用 `I` 或 `甲` 之類其他計算方式是不行的喔

#### 3.2 無序列表

**無序列表**用 `*` 、 `+` 或 `-` 來使用，例如：

```markdown
- 第一項

* 第二項

- 第三項
```

就會顯示：
![無序列表效果圖](./markdown-assets/list.png)

無序列表還有一種待辦清單的型態，例如：

```markdown
- [x] 喜歡玩遊戲
- [x] 喜歡陪兄弟玩遊戲
- [ ] 喜歡兄弟
```

顯示：
![代辦清單效果圖](./markdown-assets/todo.png)

#### 3.3 子列表

在列表底下接上子列表，只需要在選項前面加上**2**或**4**個空格就好，例如：

<!-- prettier-ignore -->
```markdown
1. 第一項
    - 第一款
    2. 第二款
- 第一項
    1. 第一條
    - 第二款
```

顯示的結果為：
![子列表效果圖](./markdown-assets/listinlist.png)

> [!NOTE]
> 拜託不要這樣寫清單，看起來有夠亂  
> 誰會寫個清單一下從標點變成標數字？

### 4. Markdown 的區塊引言 （BlockQuote）

區塊引言這部分跟列表的邏輯其實大同小異，這邊直接舉個例子：

```markdown
> 區塊
```

在 `>` 後面加上`空白鍵`再加上自己要的文字，就可以做到這樣的效果：
![區塊效果圖](./markdown-assets/block.png)

如果想要在區塊引言裡面使用另一個區塊引言、在區塊引言中使用列表或是在列表中使用區塊引言，邏輯上其實都差不多，例如：

```markdown
> 區塊引言
>
> > 裡面的區塊引言
> >
> > > 再裡面的區塊引言

> 區塊
>
> 1. 裡面的有序列表
>
> - 裡面的無序列表

1. 有序列表
   > 裡面的區塊引言
2. 有序列表
```

結果如下：
![子區塊效果圖](./markdown-assets/taowa.png)

> [!TIP] 這裡唯一需要注意的只有區塊後面無論如何**一定要加空白鍵**，沒有 `>>>` 這種使用方式

### 5. Markdown 的程式碼

當你有程式碼想要在句子裡顯示的時候，可以使用反引號把他框起來，例如：

```markdown
誰平常會用 `and` 代替 `&&` 啊？
```

就會顯示：
![程式碼區塊效果圖](./markdown-assets/codeblock.png)

但當我們有一大串code想要寫的時候怎辦呢？ 這時候有兩種辦法

1. 使用**4個空白鍵**或是**1個tab**

   <!-- prettier-ignore -->
   ```markdown
       int main() {
           cout << "Hello, C++!" << endl;
           return 0;
       }
   ```

   效果：
   ![程式碼區塊進階效果圖](./markdown-assets/codeblock_tab.png)

2. 使用 ``` 把程式碼包起來
   ````markdown
   ```
   int main() {
       cout << "Hello, C++!" << endl;
       return 0;
   }
   ```
   ````

效果：
![程式碼區塊進階效果圖](./markdown-assets/codeblock_tab.png)

> [!NOTE] 如果希望區塊裡的程式碼可以區分顏色的話，可以在第一行的```後面加上程式語言的名稱，顏色就會自己加上了 (有些軟體不支援)

### 6. Markdown 的連結

要在Markdown裡面讓文字變成超連結也有兩種方式：

```markdown
[連結的說明](連結)

or

<連結>
```

例如：

```markdown
天啊[あたらよ](https://www.youtube.com/channel/UCgrtbLQsox2EYtF0iVclZjA)的歌實在太好聽了，我要分享給大家：
<https://www.youtube.com/watch?v=8L5cQlXMpeY>
```

看起來就會像：
![連結效果圖](./markdown-assets/atarayo.png)

還有一種進階用法，把變量賦值在其他地方，例如：

```markdown
聽說[あたらよ][1]是114級社長的本命團欸，
他最喜歡[「僕は...」][2]和[10月無口な君を忘れる][3]了
我這樣打了一堆字之後，
在底下放個連結也可以連上喔：D

[1]: https://www.youtube.com/channel/UCgrtbLQsox2EYtF0iVclZjA
[2]: https://www.youtube.com/watch?v=8L5cQlXMpeY
[3]: https://www.youtube.com/watch?v=zO8yNYEsYTc
```

效果：
![連結效果圖2](./markdown-assets/atarayo2.png)

### 7. Markdown 的圖片

上面傳了那麼多圖片，終於講到圖片了
大致上的格式長這樣：

```markdown
![alt文本](圖片連結/位置)
```

alt事實上可有可無，但給瀏覽器、文字閱讀器看到這段描述，
可以進而讓**其他無法看到圖片的人**也能了解這個圖片的意含。  
實例如下：

```markdown
![開心嗎](https://ppt.cc/fKCtWx)
```

在某些軟體中你可以在圖片連結後面加上標題，它可能會顯示在圖片附近：

```markdown
開心嗎？
![開心嗎](https://ppt.cc/fKCtWx "開心嗎？")
```

效果：
![圖片效果圖](./markdown-assets/happy.png)

當然，圖片那個類似賦值的方式也可以使用喔：

```markdown
聽說[あたらよ][1]是114級社長的本命團欸，
他最喜歡[「僕は...」][2]和[10月無口な君を忘れる][3]了
我這樣打了一堆字之後，
在底下放個連結也可以連上喔：D
[atarayo][4]

[1]: https://www.youtube.com/channel/UCgrtbLQsox2EYtF0iVclZjA
[2]: https://www.youtube.com/watch?v=8L5cQlXMpeY
[3]: https://www.youtube.com/watch?v=zO8yNYEsYTc
[4]: https://i.ytimg.com/vi/8L5cQlXMpeY/maxresdefault.jpg
```

效果：
![圖片效果圖2](./markdown-assets/pic.png)

> [!NOTE]
> Markdown的圖片有個致命傷：不能自由調整大小  
> 這時候就先折衷一下吧，用普通的img標籤：
>
> ```
> ![](https://i.ytimg.com/vi/8L5cQlXMpeY/maxresdefault.jpg)
> ```

### 8. Markdown 的表格

哈哈，是不是越看越頭疼，接下來更頭疼的要來了  
這大概是整個Markdown除了數學以外的部分最令人詬病的地方： 勾使一樣的表格系統  
先來個範例：

```markdown
| 表頭 | 表頭 |
| ---- | ---- |
| 格子 | 格子 |
| 格子 | 格子 |
```

顯示結果:
![表格效果圖](./markdown-assets/table.png)

> [!NOTE]
> 這部分手寫真的會很難，而且很容易寫到不知道自己在寫什麼，
> 所以狀況許可下還是使用網路上的產生器或是插件生成較佳。
>
> 就算你已經手寫了還是請你用 Prettier 格式化一下 🤧

> [!TIP]
> 用 `:` 可以讓表格裡的文字靠某一邊對齊，例如：
>
> ```markdown
> | 左對齊 | 右對齊 | 居中對齊 |
> | :----- | -----: | :------: |
> | 格子   |   格子 |   格子   |
> | 格子   |   格子 |   格子   |
> ```
>
> 顯示結果：
> ![表格效果圖2](./markdown-assets/table2.png)

### 9. 支援HTML

如果你比較細心一點，應該可以看到上面的Note有寫到可以使用img標籤，這是因為Markdown有支援HTML  
大部分在Markdown範圍外的文字編輯都可以靠HTML做到，支援的有：  
`<kbd>` `<b>` `<i>` `<em>` `<sup>` `<sub>` `<br>`  
例如：

```markdown
使用 <kbd>ale</kbd>+<kbd>F4</kbd> 啟動遊戲加速
```

顯示：
![HTML效果圖](./markdown-assets/key.png)

### 10. Markdown 的你可能不會想用的非核心功能

合先敘明，以下功能大多為**非常用**功能或是**不一定通用**的功能，如果遇到了恭喜你就只能用，但請在心中默念三次

> 不要遇到 不要遇到 不要遇到

#### 10.1 註腳

在寫小論文的時候常常會需要像Wikipedia那樣有個註腳，可以這樣實現：

```markdown
寫文章需要
一個註釋[^1]
兩個註釋[^也可以直接寫進這裡]

[^1] 註釋欸
```

實際看起來：
![註腳效果圖](./markdown-assets/footnote.png)

#### 10.2 跳轉

讓你可以跳到其他章節，例如：

```markdown
[跳轉](#1-markdown-的標題)
```

就會顯示一個叫[跳轉](#1-markdown-的標題)的超連結，讓你跳到想要的章節

> [!NOTE]
> 其實這就是一般的超連結，只是因為標題會自動產生id  
> 所以 `#章節標題` 會直接跳轉到章節 🤓

#### 10.3 衝突解決

Markdown佔用了很多字符，所以如果有特別想顯示被占用的字符 (例如 `*` 之類的) ，  
就可以在前面加反斜線來顯示

```markdown
**加粗**
\\*\\*顯示星號\\_\\_
```

實際顯示：
![衝突效果圖](./markdown-assets/conflict.png)

#### 10.5 公式

> KaTeX沒有寫不出來的公式，只看在你能承受多少

背後的運作原理比較複雜，有需要再來問我們:D  
大部分的情況下都可以直接看[KaTeX的支援列表](https://katex.org/docs/supported.html)來使用  
這邊炫個技，剩下各位自己琢墨

```latex
$$
        \begin{pmatrix}
        1 & a_1 & a_1^2 & \cdots & a_1^n \\
        1 & a_2 & a_2^2 & \cdots & a_2^n \\
        \vdots & \vdots & \vdots & \ddots & \vdots \\
        1 & a_m & a_m^2 & \cdots & a_m^n \\
        \end{pmatrix}
$$

$$
\begin{array}{cc}
\mathrm{Bad} & \mathrm{Better} \\
\hline \\
e^{i\frac{\pi}2} \quad e^{\frac{i\pi}2}& e^{i\pi/2} \\
\int_{-\frac\pi2}^\frac\pi2 \sin x\,dx & \int_{-\pi/2}^{\pi/2}\sin x\,dx \\
\end{array}
$$
```

顯示：
![公式效果圖](./markdown-assets/math.png)

太噁心啦😍😍😍😍

#### 10.6 大魔王 - Mermaid 流程圖、順序圖、甘特圖

還好沒有註釋，所以底下這邊就任我放:D  
以下分別是[流程圖](#962-直向流程圖)、[順序圖](#965-uml順序圖)及[甘特圖](#968-甘特圖)的樣板

##### 10.6.1 橫向流程圖

````mermaid
```mermaid
graph LR
A[方形] -->B(圓形)
    B --> C{條件a}
    C -->|a=1| D[結果1]
    C -->|a=2| E[結果2]
    F[向流程圖]
```
````

![語錄評比1](./markdown-assets/boss1.png)

##### 10.6.2 直向流程圖

````mermaid
```mermaid
graph TD
A[方形] --> B(圓角)
    B --> C{條件a}
    C --> |a=1| D[結果1]
    C --> |a=2| E[結果2]
    F[直向流程圖]
```
````

![語錄評比2](./markdown-assets/boss2.png)

##### 10.6.3 標準流程圖(橫)

````markdown
```flow
st=>start: 開始
op=>operation: 處理
cond=>condition: 判斷
sub1=>subroutine: 小流程
io=>inputoutput: 輸入輸出
e=>end: 結束
st(right)->op(right)->cond
cond(yes)->io(bottom)->e
cond(no)->sub1(right)->op
```
````

![語錄評比](./markdown-assets/boss4.png)

##### 10.6.4 標準流程圖(直)

````markdown
```flow
st=>start: 開始
op=>operation: 處理
cond=>condition: 判斷
sub1=>subroutine: 小流程
io=>inputoutput: 輸入輸出
e=>end: 結束
st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
```
````

![語錄評比](./markdown-assets/boss3.png)

##### 10.6.5 UML順序圖

````markdown
```sequence
A->B: 請求
Note right of B: B描述
Note left of A: A描述
B-->A: 回應
A->B: 再回應
```
````

![語錄評比](./markdown-assets/boss5.png)

##### 10.6.6 UML順序圖(複雜版)

````markdown
```sequence
Title: 標題
A->B: A對B請求
Note right of B: B描述
Note left of A: A描述
B-->A: B對A回覆
B->C: B對C請求
C-->>A: C對A請求
A->B: A對B請求？
Note over C,B: 共識
participant C
Note right of C: C描述
```
````

![語錄評比](./markdown-assets/boss6.png)

##### 10.6.7 UML標準順序圖

````mermaid
```mermaid
sequenceDiagram
    participant A
    participant B
    A->C: A請求C
    loop 一個循環
        C->C: C對C的循環
    end
    Note right of C: 針對C的解法
    B-->>A: B回覆A
    C->B: C請求B
    B-->C: B回覆C
```
````

![語錄評比](./markdown-assets/boss7.png)

##### 10.6.8 甘特圖

````mermaid
```mermaid
        gantt
        dateFormat  YYYY-MM-DD
        title 標題
        section 階段1
        A                      :done,    des1, 2024-03-06,2014-01-08
        B                      :active,  des2, 2024-03-09, 3d
        C                     :         des3, after des2, 5d
    D                     :         des4, after des3, 5d
        section 階段2
        A                      :crit, done, 2024-03-06,24h
        B                             :crit, done, after des2, 2d
        C                                 :crit, active, 3d
        D                             :crit, 5d
        E                                   :2d
        section 階段3
        A                              :active, a1, after des3, 3d
        B                               :after a1  , 20h
        C                               : 48h
```
````

![語錄評比](./markdown-assets/boss8.png)

## 總結

以上是入門Markdown的所有內容！ 如果需要額外的補充歡迎再隨時問！
補充連結：  
[Maxkit - 如何在 Markdown 輸入數學公式及符號](https://blog.maxkit.com.tw/2020/02/markdown.html)  
[8分鐘讓你快速掌握Markdown](https://www.bilibili.com/video/BV1JA411h7Gw/?spm_id_from=333.337.search-card.all.click&vd_source=886ccfcc8bb350cf9b5294a1d20aca71)  
[[Markdown + Typora/VSCode 超全教程] 给大一新生安利的文本神器 !](https://www.bilibili.com/video/BV1hG411p7fX/?spm_id_from=333.788.recommend_more_video.-1&vd_source=886ccfcc8bb350cf9b5294a1d20aca71)  
[BEYOND【海闊天空】Music Video (粵) (HD)](https://youtu.be/qu_FSptjRic?si=57-bRU6VLio_uzTz)  
[Hack your brain with Obsidian.md](https://www.youtube.com/watch?v=DbsAQSIKQXk)  
[Appflowy - Github](https://github.com/AppFlowy-IO/AppFlowy)
