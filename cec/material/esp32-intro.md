---
title: "[教材] ESP32 初體驗"
author: "114級電機社 (第一屆)"
desc: "突然發現 Google 很有用"
date: 2024-04-16
lang: zh-tw
tags: [ESP32, 教材, 第一屆歷史資料]
---

電機社終於要教硬體，問題就是我也沒玩過

## ESP32 是什麼

> ESP32 是一系列低成本，低功耗的單晶片微控制器，整合了Wi-Fi和雙模藍牙。
> -- [維基百科](https://zh.wikipedia.org/zh-tw/ESP32)

簡單來講就是一系列的微控制器晶片，搭配程式後可以用來控制各種東西。

> [!NOTE]
> 你可能聽過 Arduino、Micro:bit
>
> 這些都是微控制器（Micro-controller），可以透過程式幫你完成事情。
> 它們之間都有不同的特色、不同的功能，我們就不詳細比較。
> _其實我也不清楚，不過 Arduino 和 ESP32 的蠻多零件都可以相容_

你最常看到的 ESP32 大概會長這樣：
![esp32 board](https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/5726/ESP32-DEVKITC-32E.jpg "ESP32 開發板 （圖片來源：Digikey）")

不過其實 ESP32 本 E 是上面的那一塊晶片，剩下的針腳、感測器、電路就是開發版的一部分。
因此，你在網路上可以找到很多種 ESP32 板，每種都包含不同的腳位、感測器，但它們都會包含其中一種 ESP32 晶片。

## 開始使用 ESP32

### 安裝開發環境

在把 ESP32 接上電腦前，先來把開發環境裝好

1. **安裝 Arduino IDE**

   [Software | Arduino](https://www.arduino.cc/en/software)

   _有點 NTR 的味_

   用 Arduino IDE 大概是寫 ESP32 程式最簡單的方法了，所以你各位得裝：）

2. **設定 Arduino IDE 使用 ESP32**

   這邊需要做幾個步驟：

   1. 在「File > Preferences > Additional board api URLs」，新增這個網址：

      https://dl.espressif.com/dl/package_esp32_index.json

      ![Arduino IDE setting](./esp32-intro-assets/arduino-ide-setting1.png)

      > [!NOTE]
      > 中文：「檔案 > 喜好設定 > 額外的開發板管理員網址」  
      > 你也可以在喜好設定的介面找到語言設定。

   2. 在「Boards Manager」，搜尋並安裝 ESP32：

      ![Arduino IDE setting](./esp32-intro-assets/arduino-ide-setting2.png)

裝完就 OK 了！這下 Arduino IDE 就可以用來編譯 ESP32 了

### 連接電腦

用條 USB 接到電腦就好了，這不用教吧

### 讓 Arduino IDE 連接 ESP32

你可能需要自己在 Arduino IDE 選擇你的 ESP32 板子：

![Arduino IDE select board](./esp32-intro-assets/arduino-ide-select-esp32-1.png)

如果有好幾個選項，你最好查一下裝置管理員看哪個是我們的板子：

![ESP32 COM in Device Manager](./esp32-intro-assets/arduino-ide-select-esp32-2.png)

找到板子是 COM 多少，就能去 Arduino IDE 找他了

> [!CAUTION]
> 如果需要選開發版類型，我們要選的是「ESP32 Dev Module」，搜尋一下應該就找得到了。

### 第一支程式

> [!NOTE]
> 這邊使用的板子是 ESP32 DEVKIT V1 _（應該是）_，
> 其他系列的 ESP32 開發板可能和下面的結果不大一樣（尤其是 `LED_BUILTIN` 的定義）。

有了開發環境、有了板子，就可以寫第一支程式了！
我們要讓板子上的 LED 閃爍，一下亮、一下暗，這基本上就是開發版界的 Hello World 了。

我們可以直接在 Arduino IDE 裡的「File > Examples > 01.Basics > Blink」找到使 LED 閃爍的程式，
IDE 裡已經內建了：）

你會看到類似這樣的程式碼：

```c
/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.
  ...
*/

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}
```

點左上角的「驗證」看看：

![Verify Arduino program](./esp32-intro-assets/first-program-verify.png)

如果發生錯誤，這是正常的。錯誤訊息說我們沒有 `LED_BUILTIN` 這個東西：

```txt nonumbers
C:\...\.arduinoIDE-something\Blink\Blink.ino: In function 'void setup()':
C:\...\.arduinoIDE-something\Blink\Blink.ino:28:11: error: 'LED_BUILTIN' was not declared in this scope
   pinMode(LED_BUILTIN, OUTPUT);
           ^~~~~~~~~~~
C:\...\.arduinoIDE-something\Blink\Blink.ino: In function 'void loop()':
C:\...\.arduinoIDE-something\Blink\Blink.ino:33:16: error: 'LED_BUILTIN' was not declared in this scope
   digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
                ^~~~~~~~~~~

exit status 1

Compilation error: 'LED_BUILTIN' was not declared in this scope
```

因為這支程式是為 Arduino 寫的，但我們用的 ESP32。
既然他說沒有 `LED_BUILTIN`，那我們就自己指定吧！

[Google 一下](https://www.google.com/search?q=esp32+builtin+led+pin)，我們知道 ESP32 的內建 LED 在第 2 針腳，
那我們就指定在程式裡：

```c
/*
  Blink ...
*/

#define LED_BUILTIN 2 // define pin 2 as builtin-led

// the setup function runs once when you press reset or power the board
void setup() {
...
```

驗證後，應該就沒問題了。接下來，就上傳看看吧：

![Upload Arduino program](./esp32-intro-assets/first-program-upload.png)

完成後的輸出大概會長這樣：

```txt nonumbers
Writing at 0x00000000... (00%)
Writing at 0x00000000... (00%)
Writing at 0x00000000... (00%)
Writing at 0x00000000... (100%)
Wrote 123456 bytes (123456 compressed) at 0x00000000 in 0.0 seconds (effective 0000.0 kbit/s)...

Hash of data verified.

Leaving...
Hard resetting via RTS pin...
```

那應該就成功了。看看你的 ESP32 上有沒有 LED 在閃吧！

## 基礎概念

🚧 UNDER CONSTRUCTION 🚧

### Arduino 程式運作

官方簡介：https://docs.arduino.cc/learn/programming/sketches/

簡單來講，我們在這邊寫的是一個類似 C 語言的程式。
也就是說，各位應該都熟悉如何宣告變數、使用函式、寫註解。
Arduino 程式比較不同的地方在於他的起始點 `setup()`、主迴圈 `loop()`、和其他已經提供好的代號及函式。

讓我們來看看幾個常用的：

1. `setup()`、`loop()`

   剛剛講到，`setup()` 就是程式的起始點，類似在 C/C++ 程式中的 `main()` 函式。
   `setup()` 會在程式開始運行時（也就是 ESP32 開機 / 重置時）被呼叫一次，也就只會被執行這一次。
   所以說，這裡的程式碼應該要**「用來初始化變數、設定針腳、設定函式庫等」**。
   （[setup() - Arduino Reference](https://www.arduino.cc/reference/en/language/structure/sketch/setup/)）

   在 `setup()` 執行完後，你應該已經把初始設定都做完了。
   接下來，就是讓機器活起來的時候了！`loop()` 就會在這時候被呼叫。
   與 `setup()` 不一樣的地方是，`loop()` 會在結束後繼續被呼叫，也就是說，這裡的程式會持續的重複執行。
   在這裡，你就應該做一些邏輯運算、偵測與發送訊號，讓你的機器可以**「有變化且會回應」**。
   （[loop() - Arduino Reference](https://www.arduino.cc/reference/en/language/structure/sketch/loop/)）

   ```c
   /* Arduino 的預設空程式。 */
   void setup() {
     // put your setup code here, to run once:
   }

   void loop() {
     // put your main code here, to run repeatedly:
   }
   ```

2. `pinMode()`、`digitalWrite()`、`HIGH`、`LOW`

   但是，實際上要怎麼控制我的板子啊？
   對於最基礎的控制，Arduino 已經有提供不少預先定義好的函式可以使用。
   一樣我們就介紹幾個真的很常見的。

   `pinMode()` 是用來設定**針腳的模式**。
   它可以被設為是 `INPUT`（輸入）、`OUTPUT`（輸出），用來指定它接下來要做什麼功用。
   預設的 `pinMode` 是 `INPUT` ，所以當我們想要在一個針腳做輸出時，就必須在 `setup()` 先宣告 `pinMode(PIN, OUTPUT)` 囉。

   說到在針腳做輸出，就要講到 `digitalWrite()` 了。顧名思義，這個函式可以做**數位訊號的輸出**。
   至於[數位訊號](https://zh.wikipedia.org/zh-tw/%E6%95%B0%E5%AD%97%E4%BF%A1%E5%8F%B7)，不就是一堆 0 和 1 嗎！
   在[數位電路](https://zh.wikipedia.org/zh-tw/%E6%95%B0%E5%AD%97%E7%94%B5%E8%B7%AF)中，
   我們就把低電位（`LOW`）當作 0、高電位（`HIGH`）當作 1。
   所以，就可以用 `digitalWrite(PIN, HIGH)` 寫出一個高電位的訊號了。

   > [!IMPORTANT]
   > 呼叫 `digitalWrite()` 後會持續輸出訊號，直到你下次再呼叫函式作寫入。

   ```c
   /* 將 PIN 腳位設成 OUTPUT 模式後，輸出 HIGH 訊號。 */
   void setup() {
     // put your setup code here, to run once:
     pinMode(PIN, OUTPUT);
     digitalWrite(PIN, HIGH);
   }

   void loop() {
     // put your main code here, to run repeatedly:
   }
   ```

3. `delay()`

   前面講到 `loop()` 會在程式運行完成後再被呼叫一次。
   但如果我不想讓板子運作這麼快、想要先停頓一下呢？
   這時候就需要一些延遲（delay）了吧。

   `delay()` 正如其名，會延遲程式碼一段時間，在時間數完後下方的程式才會繼續執行。
   只要在參數的地方寫入延遲的毫秒（millisecond, ms）數就可以了：`delay(1000)` 會延遲整整一秒。

   ```c
   /* 這就是簡單的 Blink 了！將訊號設成 HIGH、過一秒後輸出 LOW、再過一秒繼續循環！ */
   void setup() {
     // put your setup code here, to run once:
     pinMode(PIN, OUTPUT);
   }

   void loop() {
     // put your main code here, to run repeatedly:
     digitalWrite(PIN, HIGH);
     delay(1000);
     digitalWrite(PIN, LOW);
     delay(1000);
   }
   ```

### Pinout

剛剛一直講到針腳、針腳的，但板子上真腳這麼多，我要怎麼知道哪支可以幹嘛、哪支可以插。

這時候，Pinout （針腳定位）圖就很好用了！基本上你可以用的開發版都會有類似這樣的圖用來對照，這樣才知道各個針腳的功能：
![ESP32 DevKIT V1 pinout](./esp32-intro-assets/ESP32-Pinout.webp "ESP32 DevKIT V1 的 Pinout。來源：lastminuteengineers.com")

值得注意的幾種針腳：

1. `3.3V` 或 `5V`：電源針腳。用來提供其他零件電源。如果你在其他模組上看到 `VCC` 的字樣，那大概就是連接到這裡。
2. `GND`：接地針腳。通常會接在其他模組的 `GND` 針腳。
3. [`GPIO`](https://zh.wikipedia.org/zh-tw/GPIO)：可以作為輸入、輸出的用途，就是我們會用來傳輸資料的針腳。後面數字就是它的編號。

### Serial Console

通常我們執行程式都會有一個 Console 黑盒子，輸出的文字就會在這裡出現。
但是現在我們寫的程式都在板子上運作，板子上又沒有螢幕可以顯示輸出，該怎麼辦？

幸好現在許多開發版都已經內建 [UART](https://zh.wikipedia.org/zh-tw/UART) 轉 USB （UART-to-USB）的模組，
所以可以直接透過電腦與 ESP32 連線的 USB 傳輸做[序列通訊](https://zh.wikipedia.org/zh-tw/%E4%B8%B2%E8%A1%8C%E9%80%9A%E4%BF%A1)（Serial Communication），
而 Serial Communication 的 Console，肯定就叫 Serial Console 了吧。

也就是說，我們可以在 ESP32 上連線到 Serial Console 與電腦做通訊、產出輸出與輸入。

```c
/* 每秒進行輸出，並從 0 開始數秒數。 */
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

int secs = 0;

void loop() {
  // put your main code here, to run repeatedly:
  Serial.printf("%d\n", secs);

  secs += 1;

  delay(1000);
}
```

至於要用什麼函式做輸出，看看 [`print()`](https://www.arduino.cc/reference/en/language/functions/communication/serial/print)、
[`println()`](https://www.arduino.cc/reference/en/language/functions/communication/serial/println)、
[`printf()`](https://dev.to/codemee/printf-ge-shi-zi-chuan-de-shi-yong-fang-fa-n8f)。
（我找不到 `Serial.printf()` 在 Arduino 官網的文檔，所以這是 C 語言的 `printf()`。用法一樣，不過是 `Serial` 的方法。）

## 基礎就這樣了！

阿我剛碰這東西就直接來寫教材，哈哈  
反正這邊的東西都 Google 得到（）

總之也是希望大家遇到不會的東西都有自己找資料的能力啦

_如果以上資訊有誤請拜託一定要開個 Issue 或 PR 來告訴我，謝謝：）_
