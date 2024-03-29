---
title: "[歷史文件] 如何利用3D Pose Estimation 模型和視訊鏡頭實現無追蹤器的VR全身追蹤？"
author: "113級任務型機器人社 (第九屆) - Mungbean"
desc: "智慧物聯網創意應用競賽"
date: 2023-10-05
lang: zh-tw
tags: [機器人社歷史資料]
---

## 發想源起

一切要從我去年買了Meta Quest 2在VRChat這款社交遊戲的體驗開始，Quest 2使大眾使用VR門檻低了很多，但還是能看到某些功能實現相當的昂貴。

比如說全身追蹤，最一開始，也是最知名的的VR全身追蹤系統，是HTC與知名遊戲平台Steam的母公司VALVe所合作研發的HTC vive燈塔定位系統(Lighthouse)，它使用紅外線陣列或雷射基站來定位空間中的vive追蹤器，獲得如今全身追蹤仍是準確度最高、延遲最低的解決方案，但如此高性能的追蹤方式也帶來了非常直觀的缺點：那就是價格極其昂貴，一顆二代基站台灣HTC官方要價6500元，即便是1代基站也要新台幣4750元，買了基站還需購入追蹤器才能定位，目前官方在售的vive 追蹤器3代一顆需要4200元新台幣，定位點越多，錢包失血越多。

反觀目前已經漲價的最新款Meta Quest 3 VR頭顯，台灣區售價529.99美金，以匯率32元計算約17000元新台幣，也就是大約兩個基站加上一個追蹤器的錢，就能買到頭顯本體，可見從VR入門到較為高階的全身追蹤，所付出的財力代價是相當高的。

這套方案還有個非常明顯的問題，那就是部署極度不方便，首先要先找出一塊空間架設基站，處理有線連接的線材，若為無線連接還需要考慮干擾、延遲及電池續航問題；再者，還要在身上綁追蹤器用於定位，只為了追求極致的定位效果。

VR使用者目前在台灣不算普及，有足夠能力和財力能部屬這套系統的人少之又少，顯然這套系統並不適合推廣VR設備的普及，更像是給專業用戶的生產力工具及VR發燒友的高階配備。
有沒有更加經濟實惠的解決方案?答案是有的。

由於當時處於VR普及早期，為了加速軟硬體生態環境發展，VALVe開發了一套面向開發者，包含一系列SDK和API的開源工具集"OpenVR"，為後續的VR軟硬體發展奠定了很大的基礎，藉由OpenVR，許多第三方VR軟體、硬體都能執行在基於OpenVR的SteamVR上。

目前最知名的全身追蹤替代方案，SlimeVR也由此而生。

SlimeVR這套開源方案很有效的解決了Lighthouse系統價格昂貴的問題，而且定位效果也不差，是大多數想上全身追蹤的VR玩家之首選，但它還是面臨一些小問題：因為SlimeVR的原理是透過多個慣性測量傳感器，如加速度計、陀螺儀和磁力計來進行追蹤，因此綁在身上的傳感器越多越準確，過少的追蹤器會導致追蹤偏移明顯，過多則會導致舒適度降低。

Xbox kinect，是個用於xbox 360和xbox one的追蹤裝置，它具備多鏡頭組成的3D結構光深度傳感器，若能將它用於全身追蹤，豈不是深度資訊等傳統鏡頭需要繞道解決的方案都能迎刃而解?
答案是肯定的，它甚至不需要在身上綁tracker就能追蹤，本體也跟網路攝影機相似，達到方便部屬和啟動的超便利效果，因為是遊戲機外部配件，因此二手價格極其便宜，但同樣有缺點：因為機體性能因素，計算人體部位的速度稍嫌緩慢，約70ms(14fps)這會導致進入VR後會很明顯感覺到追蹤慢一拍，行業標竿Lighthouse 延遲最大值約為2.7ms。

其實kinect還有出一版面像企業的版本[1]，但跟Lighthouse系統價差不大了，無法納入選擇。
我就在想，有沒有像是kinect，又有比kinect更高算力的裝置?於是就有了這項創意提案。

## 提案內容

### 目標
以軟體層面和大眾較有可能擁有的硬體設備實現全身追蹤

### 原因
解決當前實現VR全身追蹤昂貴和需要穿戴追蹤器的不便

### 實現方式
有個適用於兩種裝置但相似的做法：手機或電腦外接網路攝影機，使用AI模型對連續影像進行人體關鍵點判斷後輸出座標矩陣，將關鍵點座標轉換成四元數後通過OSC協議輸出至VirtualMotionTracker(VMT)，再由VMT轉換tracker數據輸出至SteamVR客戶端。
詳細實現在具體實作方法

### 優點
無須在身上綁追蹤器，幾乎為軟體實現，所以只要有手機和電腦，或電腦有鏡頭就能使用，成本趨近為零

### 模型選擇
3D人體姿態估計(3D Human pose estimation)模型分為2D估計轉3D估計和直接3D估計，本提案撰寫時測試了yolov8n-pose和human-pose-estimation-3d-0001兩種模型，分別是純2D估計和2D轉3D估計，提交提案時發現human-pose-estimation-3d-0001模型於短期內實作成功的可能性較高，而yolov8n-pose雖有著更高的偵測精確度，但是在開發上出現了較大的困難，將會在附錄說明。

### 系統硬體配置
桌機
CPU：Genuine Intel® 0000 (i9-13900K ES2 Q0NT)

Memory: 65536MB RAM(64GB)

GPU.0:Intel® UHD Graphics 770

GPU.1:Intel® Arc™ A750 Graphics

Operating System: Windows 11 專業工作站版 Insider Preview 64-bit (10.0, Build 25967) (25967.rs_prerelease.230929-1123)

WebCam0：Logi C270 HD WebCam

WebCam1：Asus Zenfone 9 with DroidCam App

### 系統軟體環境

1. 參考第21點參考資料中的教程安裝Openvino Runtime。
  
  其中可能需要的依賴有：[2]
  
  Microsoft Visual Studio 2019
  
  CMake 3.14 or higher (64 bit)
  
  Python 3.7-3.11
  
  OpenCV 4.5

  Intel® HD Graphics Driver (Required only for GPUs.)

2. 參考第22點參考資料中的教程安裝Openvino_notebooks Winodws版
3. 視情況可能需要在openvino_env環境內之python重新安裝套件[3]
4. 若無WebCam可使用手機用有線或無線連接至電腦使用DroidCam調用手機的鏡頭，手機須開啟偵錯模式，電腦需安裝DroidCam Client
5. 在Steam下載並安裝SteamVR，若從未使用Steam請先至第25點參考資料下載並安裝Steam電腦客戶端，並註冊一個帳戶
6. 參考第25點參考資料安裝Virtual Motion Tracker

### 具體實作方法
`假設已在openvino_env環境內啟動Jupyter lab後端且啟動路徑為\..\\openvino_notebooks`

瀏覽器開啟`http://localhost:8888/lab`[4]進入Jupyter lab前端

左側文件區依序選取`notebooks` `406-3D-pose-estimation-webcam` `406-3D-pose-estimation.ipynb`[5]

左上角選單點擊`Kernel Restart Kernel and Run All Cells...`

然後Demo就會給使用模型運算的結果，而主要程式碼中的`poses_3d`就是模型做完後處理準備放入3D渲染的座標值，它是個NumPy數組，形狀為(1,19,3)

具體一點會像這樣，直接改程式碼印出的話不會包含逗號分隔

```
a = np.array([[[-350.90454,91.27199,-146.26155],
  [-353.64313, 106.48863, -146.67688],
  [-346.49103, 43.317245, -138.8419],
  [-348.81873, 91.42526, -147.17023],
  [-344.75793, 65.35582, -145.61086],
  [-349.52734, 42.52623, -143.01671],
  [-351.48395, 39.274277, -146.33368],
  [-352.26984, 3.1951752, -145.40761],
  [-354.8626, -31.961075, -146.13872],
  [-353.753, 92.112335, -148.3025],
  [-352.36456, 68.629745, -146.22815],
  [-352.734, 47.22838, -142.20372],
  [-349.59467, 44.723495, -140.12181],
  [-346.32623, 9.699081, -135.05162],
  [-343.21436, -23.875137, -135.13402],
  [-368.05444, 97.3535, -146.76236],
  [-373.4817, 86.85057, -145.6936],
  [-364.13232, 98.67735, -147.7834],
  [-366.9558, 94.13725, -148.98228]]]
)
```

### 待辦事項
- [ ] 搞懂怎麼把連續的座標矩陣轉成含四元數的數據

有了數據後用OSC傳出去

模型輸出方面到此為止，接下來是VMT和SteamVR的部分

## 執行過程中的疑難雜症

### 缺點
1. 尚沒有人開源展示類似實現
2. 部分閉源實現因後續無人維護而無法使用
3. 部分實現使用的模型或算法導致成效不佳及效率低下

## 提案後續之討論
1. 當前項目尚未串接完成，無法直接使用
2. 尚未搞懂VMT要怎麼校正這些座標數據

## 組員分工

隊長：全部事項

指導老師：模型輸入輸出分析、搜尋關鍵字討論、參考資料提供

## 附錄

### 參考資料
1. SlimeVR說明文檔 - docs.slimevr.dev
2. Lighthouse系统基站原理与追踪器定位原理解析 - 幕幕Hare - bilibili.com
3. slimevr上手流程，以及使用过程中遇到的一些问题以及解决方法 - 是猫ちゃん丶 - bilibili.com
4. 不到400！超低价玩转VR全身追踪（全平台）- Mega会玩 - bilibili.com
5. HTC Vive - zh.wikipedia.org
6. Kinect - zh.wikipedia.org
7. OpenVR - en.wikipedia.org
8. VIVE 基地台 - vive.com
9. SteamVR基地台2.0 - vive.com
10. VIVE 移動定位器 (3.0) - vive.com
11. Meta Quest 3 - meta.com
12. SteamVR - store.steampowered.com
13. Analysis of Valve’s ‘Lighthouse’ Tracking System Reveals Accuracy - Ben Lang - roadtovr.com
14. 【草稿】Kinect低成本全身追蹤方案 教學與心得 - 提拉米酥(mtis1233) - home.gamer.com.tw
15. 7个VR开发中容易混淆的概念：SteamVR、OpenVR、OpenXR…… - 邵伟 - zhuanlan.zhihu.com
16. 3D 人体姿态估计简述 - OpenMMLab - zhuanlan.zhihu.com
17. Ultralytics YOLOv8 - github.com
18. 3D Human Pose Estimation Python* Demo - docs.openvino.ai
19. Live 3D Human Pose Estimation with OpenVINO - docs.openvino.ai
20. Install Openvino - intel.com
21. Install OpenVINO™ Runtime on Windows from an Archive File - docs.openvino.ai
22. openvinotoolkit/openvino_notebooks-windows - github.com
23. gpsnmeajp/VirtualMotionTracker - github.com
24. Steam官方下載頁面 - store.steampowered.com
25. VirtualMotionTracker-Setup - gpsnmeajp.github.io
26. VirtualMotionTracker-API - gpsnmeajp.github.io

---------------------------

1. Azure Kinect DK $399USD(台幣約12768元) https://azure.microsoft.com/zh-tw/products/kinect-dk/ ↩︎
2. 實作時電腦僅安裝了Intel® HD Graphics Driver、Python 3.11和Visual Studio Build Tools 2022並勾選"使用C++的桌面開發"，仍然安裝成功。並無安裝Cmake，OpenCV僅安裝python內之模組包。 ↩︎
3. 如`torch`,`onnx` ↩︎
4. 預設埠口就是8888 ↩︎
5. 此時網址應為`http://localhost:8888/lab/tree/notebooks/406-3D-pose-estimation-webcam` ↩︎
