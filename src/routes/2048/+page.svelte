<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => import("./2048.js"));
</script>

<p>join the number to get 2048 tile!</p>
<div class="cover"></div>
<div class="container">
  <div class="logo">2048</div>
  <div class="scoreBar">
    <label style="position: relative; top:-13px;">score:</label>
    <label id="score"> 0</label>
    <div id="addScore"></div>
  </div>
  <div id="stage"></div>
</div>

<style>
  .container {
    margin: auto;
    width: 452px;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .logo {
    width: 40%;
    font-size: 70px;
    font-weight: bold;
    color: #d13100;
    float: left;
    position: relative;
  }
  .scoreBar {
    width: 50%;
    float: right;
    background: #fff;
    color: #111;

    padding: 10px;
    position: relative;
    margin-top: 10px;
  }
  .scoreBar:before {
    content: "";
    display: block;
    border-width: 20px;
    border-color: transparent #fff transparent transparent;
    border-style: solid;
    position: absolute;
    top: 50%;
    left: -40px;
    margin-top: -20px;
  }
  #score {
    font-size: 50px;
  }

  #addScore {
    position: absolute;
    bottom: 0px;
    font-size: 30px;
    color: #999;
    opacity: 0.8;
    top: 4px;
    right: 0;
  }
  #addScore.show {
    opacity: 0.8;
    transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
  }
  #addScore.hide {
    opacity: 0;
    transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
  }

  #stage {
    background: #bbada0;
    cursor: pointer;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    position: absolute;
    width: 450px;
    height: 450px;
    top: 50%;
    left: 0;
    margin-top: -200px;
    border: 1px solid #eee;
    z-index: 1;
  }

  #undo {
    position: relative;
    z-index: 990;
  }

  .cover {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    opacity: 0.1;
    cursor: pointer;
  }

  :global(.row0) {
    top: 10px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  :global(.row1) {
    top: 120px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  :global(.row2) {
    top: 230px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  :global(.row3) {
    top: 340px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.cell0) {
    left: 10px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  :global(.cell1) {
    left: 120px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  :global(.cell2) {
    left: 230px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }
  :global(.cell3) {
    left: 340px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(span.tile) {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 5%;
    position: absolute;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
    background: #fff;
    font-size: 43px;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  div {
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  :global(.num2) {
    background: #fff;
    color: #777;
    font-size: 100px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    animation: myfirst 0.5s;
    -moz-animation: myfirst 0.5s; /* Firefox */
    -webkit-animation: myfirst 0.5s; /* Safari or Chrome or opera */
  }

  :global(.num4) {
    background: #fafafa;
    color: #e9b856;
    font-size: 100px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    animation: myfirst 0.5s;
    -moz-animation: myfirst 0.5s; /* Firefox */
    -webkit-animation: myfirst 0.5s; /* Safari or Chrome */
  }

  :global(.num8) {
    background: #f3f3f3;
    color: #f94e2f;
    font-size: 100px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    animation: myfirst 0.5s;
  }

  :global(.num16) {
    background: #f5ec00;
    color: #fff;
    font-size: 80px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    animation: myfirst 0.5s;
  }

  :global(.num32) {
    background: #fcc20e;
    color: #fdfdfd;
    font-size: 80px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num64) {
    background: #f94a3b;
    color: #fff;
    font-size: 80px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num128) {
    background: #222;
    color: #f94e2f;
    font-size: 52px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num256) {
    background: #d13100;
    color: #ffcc66;
    font-size: 52px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num512) {
    background: #fff300;
    color: #fb4e4e;
    font-size: 52px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num1024) {
    background: #6483b5;
    color: #f6f7ff;
    font-size: 52px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num2048) {
    background: #000000;
    color: #fff300;
    font-size: 52px;

    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  :global(.num4096) {
    background: #ff0099;
    color: #fff;
    font-size: 52px;
    transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  @keyframes myfirst {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @-moz-keyframes myfirst /* Firefox */ {
    0% {
      opacity: 0;
      -moz-transform: scale(0);
    }
    50% {
      opacity: 0.5;
      -moz-transform: scale(1.5);
    }
    100% {
      opacity: 1;
      -moz-transform: scale(1);
    }
  }
  @-webkit-keyframes myfirst /* Safari or Chrome */ {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
    }
    50% {
      opacity: 0.5;
      -webkit-transform: scale(1.5);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
    }
  }
</style>
