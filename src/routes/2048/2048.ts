import { browser } from "$app/environment";
import { writable, type Readable } from "svelte/store";
import Emittery from "emittery";

type Tile = {
  boxObj: { value: number; parent: Tile; domObj: HTMLElement } | null;
  position: [number, number];
};

type Events = {
  score: number;
  stageChange: Tile[][];
  gameOver: never;
};

/*
 * A game of 2048
 *
 * Code originally made by Kakashi on medium.com.
 * Source URL: https://medium.com/@aswingiftson007/2048-game-in-html-and-javascript-c6cc63d2698f
 *
 * THANK YOU FOR THE AMAYZING CODE :D
 */
export class Game2048 extends Emittery<Events> {
  score = 0;
  stage: Tile[][] = [];
  controller = getController(this);

  constructor(public size: number = 4) {
    super();
    this.initStage();

    this.emit("score", this.score);
    this.emit("stageChange", this.stage);
  }

  /**
   * Set every tile on the stage (of size {@link Game2048.size}) to empty tile
   */
  initStage(): void {
    for (let row = 0; row < this.size; row++) {
      this.stage[row] = [];
      for (let cell = 0; cell < this.size; cell++) {
        this.stage[row][cell] = {
          boxObj: null,
          position: [row, cell]
        };
      }
    }
  }

  /**
   * Add 2 new boxes (for a new game).
   */
  gameStartBoxes(): void {
    this.newBox();
    this.newBox();
  }

  /**
   * create a new box on a random tile
   */
  newBox(): void {
    const createBox = (num: number, position: [number, number]) => {
      const domBox = document.createElement("span");
      domBox.innerText = num.toString();
      domBox.textContent = num.toString();
      domBox.className = `num${num} tile`;
      domBox.style.setProperty("--row", position[0].toString());
      domBox.style.setProperty("--cell", position[1].toString());

      document.getElementById("stage")?.appendChild(domBox);

      domBox.animate(
        { opacity: [0, 1], transform: ["scale(0)", "scale(1)"] },
        { duration: 200, easing: "ease-out" }
      );

      return domBox;
    };

    const emptyList = this.emptyTiles();
    if (emptyList) {
      const randomTile = emptyList[Math.floor(Math.random() * emptyList.length)];
      const num = Math.random() > 0.9 ? 4 : 2;

      randomTile.boxObj = {
        value: num,
        parent: randomTile,
        domObj: createBox(num, randomTile.position)
      };

      this.emit("stageChange", this.stage);
    }
  }

  /**
   * do a move in the specified direction
   */
  move(dir: "left" | "up" | "right" | "down"): void {
    let didMove = false;
    didMove = this.handleMove(dir);

    let scoreAdded = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        let targetTile: Tile;
        let currentTile: Tile;
        switch (dir) {
          case "left": {
            targetTile = this.stage[i][j];
            currentTile = this.stage[i][j + 1];
            break;
          }
          case "up": {
            targetTile = this.stage[j][i];
            currentTile = this.stage[j + 1][i];
            break;
          }
          case "down": {
            targetTile = this.stage[this.size - 1 - j][i];
            currentTile = this.stage[this.size - 2 - j][i];
            break;
          }
          case "right": {
            targetTile = this.stage[i][this.size - 1 - j];
            currentTile = this.stage[i][this.size - 2 - j];
            break;
          }
        }

        if (currentTile.boxObj && targetTile.boxObj?.value == currentTile.boxObj.value) {
          // two tiles can be merged
          scoreAdded += this.mergeTo(currentTile, targetTile);
          this.handleMove(dir);
          didMove = true;
        }
      }
    }

    if (didMove) {
      this.newBox();
    }
    if (this.isEnd()) {
      this.gameOver();
    }
  }

  /**
   * Resets the game, optionally with a new size.
   * Initializes a new stage, and resets the score to 0.
   */
  reset(size: number = this.size): void {
    document.getElementById("stage")?.replaceChildren();

    this.size = size;

    this.initStage();
    this.score = 0;

    this.emit("score", this.score);
    this.emit("stageChange", this.stage);
  }

  /**
   * @returns whether the game has reached the end
   */
  isEnd(): boolean {
    let emptyList = this.emptyTiles();
    if (emptyList.length > 0) return false;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let obj = this.stage[i][j];
        let objLeft = j == 0 ? { boxObj: { value: 0 } } : this.stage[i][j - 1];
        let objRight = j == 3 ? { boxObj: { value: 0 } } : this.stage[i][j + 1];
        let objUp = i == 0 ? { boxObj: { value: 0 } } : this.stage[i - 1][j];
        let objDown = i == 3 ? { boxObj: { value: 0 } } : this.stage[i + 1][j];
        if (
          obj.boxObj?.value == objLeft.boxObj?.value ||
          obj.boxObj?.value == objDown.boxObj?.value ||
          obj.boxObj?.value == objRight.boxObj?.value ||
          obj.boxObj?.value == objUp.boxObj?.value
        ) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * get a list of empty tiles on the {@link stage}
   */
  private emptyTiles(): Tile[] {
    let emptyList = [];
    for (let row = 0; row < this.size; row++) {
      for (let cell = 0; cell < this.size; cell++) {
        if (this.stage[cell][row].boxObj == null) {
          emptyList.push(this.stage[cell][row]);
        }
      }
    }
    return emptyList;
  }

  /**
   * move tiles in the specified direction
   *
   * @returns whether any tile has moved or not
   */
  private handleMove(dir: "left" | "up" | "right" | "down"): boolean {
    let didMove = false;

    for (let i = 0; i < this.size; i++) {
      let lastEmpty: Tile | null = null;
      for (let j = 0; j < this.size; j++) {
        let tileInThisWay: Tile;
        switch (dir) {
          case "left":
            tileInThisWay = this.stage[i][j];
            break;
          case "up":
            tileInThisWay = this.stage[j][i];
            break;
          case "down":
            tileInThisWay = this.stage[this.size - 1 - j][i];
            break;
          case "right":
            tileInThisWay = this.stage[i][this.size - 1 - j];
            break;
        }

        if (tileInThisWay.boxObj != null && lastEmpty) {
          this.moveTo(tileInThisWay, lastEmpty);
          lastEmpty = null;
          j = 0;
          didMove = true;
        } else if (tileInThisWay.boxObj == null && !lastEmpty) {
          lastEmpty = tileInThisWay;
        }
      }
    }
    return didMove;
  }

  /**
   * move {@link srcTile} into {@link destTile}
   * emits `stageChange` event
   */
  private moveTo(srcTile: Tile, destTile: Tile): void {
    if (!srcTile.boxObj) return;
    destTile.boxObj = srcTile.boxObj;

    destTile.boxObj.domObj.className = `num${destTile.boxObj?.value} tile`;
    destTile.boxObj.domObj.style.setProperty("--row", destTile.position[0].toString());
    destTile.boxObj.domObj.style.setProperty("--cell", destTile.position[1].toString());

    srcTile.boxObj = null;

    this.emit("stageChange", this.stage);
  }

  /**
   * merges {@link srcTile} to {@link destTile}
   * and changes the score onto the scoreboard
   *
   * @returns the number after two tiles has combined
   */
  private mergeTo(srcTile: Tile, destTile: Tile): number {
    if (!srcTile.boxObj || !destTile.boxObj) return 0;

    const destDom = destTile.boxObj.domObj;
    const srcDom = srcTile.boxObj.domObj;
    const newValue = destTile.boxObj.value * 2;

    srcTile.boxObj.value = newValue;
    srcTile.boxObj.domObj.className = `num${newValue} tile`;
    srcTile.boxObj.domObj.innerText = newValue.toString();
    srcTile.boxObj.domObj.textContent = newValue.toString();

    srcTile.boxObj.domObj.style.setProperty("--row", destTile.position[0].toString());
    srcTile.boxObj.domObj.style.setProperty("--cell", destTile.position[1].toString());

    this.score += newValue;

    srcDom.animate(
      { transform: ["scale(1)", "scale(1.1)", "scale(1)"] },
      { duration: 200, easing: "ease-out" }
    );

    destDom.style.zIndex = "-10";
    setTimeout(() => {
      document.getElementById("stage")?.removeChild(destDom);
    }, 200);

    destTile.boxObj = srcTile.boxObj;
    srcTile.boxObj = null;

    this.emit("score", this.score);
    this.emit("stageChange", this.stage);

    return destTile.boxObj?.value ?? 0;
  }

  private gameOver(): void {
    this.emit("gameOver");
  }
}

export function scoreStores(gameObj: Game2048): {
  score: Readable<number>;
  bestScore: Readable<Record<number, number>>;
} {
  const savedBest = getSavedBestScore("2048BestScore");

  const { set: setScore, subscribe: subscribeScore } = writable(gameObj.score);
  const { update: updateBest, subscribe: subscribeBest } = writable(
    savedBest ?? { [gameObj.size]: gameObj.score }
  );

  gameObj.on("score", (newScore) => setScore(newScore));

  subscribeScore((newScore) => {
    updateBest((oldBest) => {
      oldBest[gameObj.size] = Math.max(oldBest[gameObj.size] ?? 0, newScore);
      return oldBest;
    });
  });

  subscribeBest((newBest) => {
    if (!browser) return;

    window.localStorage.setItem("2048BestScore", JSON.stringify(newBest));
  });

  return {
    score: { subscribe: subscribeScore },
    bestScore: { subscribe: subscribeBest }
  };
}

function getSavedBestScore(itemName: string): Record<number, number> | null {
  if (!browser) return null;

  try {
    return JSON.parse(window.localStorage.getItem(itemName) ?? "");
  } catch {
    return null;
  }
}

/**
 * Get a mouse/touch controller for the {@link Game2048}
 *
 * @returns function utilities for making moves using mouse
 */
function getController(gameObj: Game2048) {
  let startX = 0;
  let startY = 0;
  let ready = 0;
  return {
    start(x: number, y: number) {
      ready = 1;
      startX = x;
      startY = y;
    },
    move(x: number, y: number) {
      if (x - startX > 100 && ready) {
        gameObj.move("right");
        ready = 0;
      } else if (startX - x > 100 && ready) {
        gameObj.move("left");
        ready = 0;
      } else if (startY - y > 100 && ready) {
        gameObj.move("up");
        ready = 0;
      } else if (y - startY > 100 && ready) {
        gameObj.move("down");
        ready = 0;
      }
    },
    end() {
      ready = 0;
    }
  };
}
