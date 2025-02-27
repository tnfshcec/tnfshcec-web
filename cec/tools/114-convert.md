---
title: "114 年分科分數轉換"
---

<script>
    let gsatScoreCh = 0;
    let offsetCh = 5.29;
    let gsatScoreEn = 0;
    let offsetEn = 6.17067;
    let gsatScoreMaA = 0;
    let offsetMaA = 6.12667;
    let gsatScoreMaB = 0;
    let offsetMaB = 6.29;
    let gsatScoreSo = 0;
    let offsetSo = 7.68933;
    let gsatScoreSc = 0;
    let offsetSc = 7.87467;
</script>

## 國文

學測原始分數（輸入）：
<input type=number min=0 max=100 bind:value={gsatScoreCh}>

<div>
學測級分：{Math.min(15, Math.ceil(gsatScoreCh/offsetCh))}</div>

<div>
轉換分科級分：{Math.min(60, Math.ceil(gsatScoreCh/offsetCh*4))}</div>

## 英文

學測原始分數（輸入）：
<input type=number min=0 max=100 bind:value={gsatScoreEn}>

<div>
學測級分：{Math.min(15, Math.ceil(gsatScoreEn/offsetEn))}</div>

<div>
轉換分科級分：{Math.min(60, Math.ceil(gsatScoreEn/offsetEn*4))}</div>

## 數學 A

學測原始分數（輸入）：
<input type=number min=0 max=100 bind:value={gsatScoreMaA}>

<div>
學測級分：{Math.min(15, Math.ceil(gsatScoreMaA/offsetMaA))}</div>

<div>
轉換分科級分：
{Math.min(60, Math.ceil(gsatScoreMaA/offsetMaA*4))}</div>

## 數學 B

學測原始分數（輸入）：
<input type=number min=0 max=100 bind:value={gsatScoreMaB}>

<div>
學測級分：{Math.min(15, Math.ceil(gsatScoreMaB/offsetMaB))}</div>

<div>
轉換分科級分：{Math.min(60, Math.ceil(gsatScoreMaB/offsetMaB*4))}</div>

## 社會

學測原始分數（輸入）：
<input type=number min=0 max=144 bind:value={gsatScoreSo}>

<div>
學測級分：{Math.min(15, Math.ceil(gsatScoreSo/offsetSo))}</div>

<div>
轉換分科級分：{Math.min(60, Math.ceil(gsatScoreSo/offsetSo*4))}</div>

## 自然

學測原始分數（輸入）：
<input type=number min=0 max=128 bind:value={gsatScoreSc}>

<div>
學測級分：{Math.min(15, Math.ceil(gsatScoreSc/offsetSc))}</div>

<div>
轉換分科級分：{Math.min(60, Math.ceil(gsatScoreSc/offsetSc*4))}</div>