---
title: "[教材] ESP32 零件、模組介紹"
author: "114級電機社 (第一屆) - EGRO"
desc: "資料整理起來就沒理由不玩了吧"
date: 2024-05-19
lang: zh-tw
tags: [ESP32, 教材, 第一屆歷史資料]
---

都花錢買了一堆零件，那肯定要用用看吧

## 板子上的模組

首先，還是看到手上的這塊 ESP32 開發板。
它上面除了整個微控制器的核心，還有許多已經內建的零件。我們先來用用看這些吧。

### 內建 LED

內建 LED 應該是大家最熟悉的部份吧，畢竟它最常被我們拿來 Blink 測試板子有沒有問題。

```c
void loop() {
  digitalWrite(BUILTIN_LED, HIGH); // 設成高電位（亮）
  delay(1000); // 等待 1 秒
  digitalWrite(BUILTIN_LED, LOW); // 設成低電位（暗）
  delay(1000); // 等待 1 秒
}
```

不過 LED 可不是只有暗或亮兩個選項。它有這麼多種亮度可以發出來，不用就太可惜了吧？
透過 PWM 訊號，調整 Duty Cycle，LED 的亮度就會改變。

![pwm signal](./esp32-modules-assets/pwm-signal.webp "PWM 訊號——透過調整 Duty Cycle（高電位的時間占比），可以改變 LED 的亮度。")

在 Arduino IDE 裡發出不同 Duty Cycle 的訊號也很簡單：

```c
analogWrite(BUILTIN_LED, VALUE); // VALUE 為數值，範圍 0 ~ 255
```

這樣 LED 就可以顯示不同亮度了！透過亮度，就很容易能表示一個數值（像是時間、距離、溫度）的大小了吧！

我還順便做了個（類）呼吸燈來用：）

```c
int brightness = 0;

void loop() {
  while (brightness <= 255) {
    analogWrite(LED_BUILTIN, brightness++);
    delay(10);
  }
  while (brightness >= 0) {
    analogWrite(LED_BUILTIN, brightness--);
    delay(10);
  }
}
```

### 按鈕

我們知道板子上的 EN 按鈕是重置用的，可以讓板子的程式重新開始；至於 BOOT，是用來讓開發版進入 Bootloader，進行程式或韌體的上傳。
不過有些板子在上傳程式時不需要按著 BOOT，因為每張開發版上有的零件不大一樣。

重點是，BOOT 按鈕是連接到 GPIO0，意味著我們可以透過程式讀取到它的狀態，作為輸入（Input）的管道。

> [!IMPORTANT]
> 按鈕在釋放時是**高電位**（`HIGH`）、按下時是**低電位**（`LOW`）。

這樣，我們就能寫個簡單的程式：

```c
void loop() {
  if (digitalRead(0) == LOW) { // 如果 GPIO0 （BOOT 按鈕）是低電位（按著）
    digitalWrite(LED_BUILTIN, HIGH); // 就對 LED 送出高電位（亮）
  } else {
    digitalWrite(LED_BUILTIN, LOW); // 按鈕釋放就送出低電位（暗）
  }
  delay(10);
}
```

### WiFi

### 藍芽

---

接下來，就來看看有什麼其他零件可以接上吧。

但首先，我們有這麼多零件，要怎麼把它們都接上去啊？
尤其在 3V3 和 GND 腳位少的開發版上，直接把線插上針腳就沒辦法一次使用好幾個零件。
但我們測試用的東西又不可能直接焊接上去。
所以，我們需要另一塊板子幫我們連接電線，又不能直接黏死。這就是麵包板的用處啦

## 麵包板

## LED

## 按鈕

## 觸摸按鈕

## 蜂鳴器

## 超音波測距

## 麥克風傳感器

## 溫度傳感器

## LCD 液晶螢幕
