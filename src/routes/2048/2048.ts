/*
 * Code originally made by Kakashi on medium.com.
 * Source URL: https://medium.com/@aswingiftson007/2048-game-in-html-and-javascript-c6cc63d2698f
 *
 * THANK YOU FOR THE AMAYZING CODE :D
 */

type Tile = {
  boxObj: { value: number; parent: Tile; domObj: HTMLElement } | null;
  position: [number, number];
};

export class Game2048 {
  points = { score: 0, history: [], status: 1 };
  stage: Tile[][] = [];

  constructor() {
    this.initStage();
  }

  private initStage(): void {
    for (let cell = 0; cell < 4; cell++) {
      this.stage[cell] = [];
      for (let row = 0; row < 4; row++) {
        this.stage[cell][row] = {
          boxObj: null,
          position: [cell, row]
        };
      }
    }
  }

  /**
   * get a list of empty tiles on the {@link stage}
   */
  private empty(): Tile[] {
    let emptyList = [];
    for (let row = 0; row < 4; row++) {
      for (let cell = 0; cell < 4; cell++) {
        if (this.stage[cell][row].boxObj == null) {
          emptyList.push(this.stage[cell][row]);
        }
      }
    }
    return emptyList;
  }

  /**
   * create a new box on a random tile
   */
  newBox(): void {
    const createBox = (num: number, position: [number, number]) => {
      const domBox = document.createElement("span");
      domBox.innerText = num.toString();
      domBox.textContent = num.toString();
      domBox.className = `row${position[0]} cell${position[1]} tile`;

      document.getElementById("stage")?.appendChild(domBox);

      return domBox;
    };

    const emptyList = this.empty();
    if (emptyList) {
      const randomTile = emptyList[Math.floor(Math.random() * emptyList.length)];
      const num = Math.random() > 0.9 ? 4 : 2;

      randomTile.boxObj = {
        value: num,
        parent: randomTile,
        domObj: createBox(num, randomTile.position)
      };
    }
  }

  /**
   * @returns whether the game has reached the end
   */
  private isEnd(): boolean {
    let emptyList = this.empty();
    if (emptyList.length > 0) return false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
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

  private gameOver(): void {
    alert("GAVE OVER!");
  }

  /**
   * move {@link srcTile} into {@link destTile}
   */
  private moveTo(srcTile: Tile, destTile: Tile): void {
    destTile.boxObj = srcTile.boxObj;

    if (destTile.boxObj)
      destTile.boxObj.domObj.className = `row${destTile.position[0]} cell${destTile.position[1]} num${destTile.boxObj?.value} tile`;

    srcTile.boxObj = null;
  }

  /**
   * combines {@link srcTile} to {@link destTile}
   * and changes the score onto the scoreboard
   *
   * @returns the number after two tiles has combined
   */
  private addTo(srcTile: Tile, destTile: Tile): number {
    destTile.boxObj?.domObj.parentNode?.removeChild(destTile.boxObj.domObj);
    destTile.boxObj = srcTile.boxObj;
    srcTile.boxObj = null;
    if (destTile.boxObj) {
      destTile.boxObj.value = destTile.boxObj?.value * 2;
      destTile.boxObj.domObj.className = `row${destTile.position[0]} cell${destTile.position[1]} num${destTile.boxObj?.value} tile`;
      destTile.boxObj.domObj.innerText = destTile.boxObj.value.toString();
      destTile.boxObj.domObj.textContent = destTile.boxObj.value.toString();
      this.points.score += destTile.boxObj.value;
    }
    const scoreBar = document.getElementById("score");
    if (scoreBar) {
      scoreBar.innerText = this.points.score.toString();
      scoreBar.textContent = this.points.score.toString();
    }
    return destTile.boxObj?.value ?? 0;
  }

  /**
   * move tiles in the specified direction
   *
   * @returns whether any tile has moved or not
   */
  private clear(dir: "left" | "up" | "right" | "down"): boolean {
    let didMove = false;

    for (let i = 0; i < 4; i++) {
      let lastEmpty: Tile | null = null;
      for (let j = 0; j < 4; j++) {
        let tileInThisWay: Tile;
        switch (dir) {
          case "left":
            tileInThisWay = this.stage[i][j];
            break;
          case "up":
            tileInThisWay = this.stage[j][i];
            break;
          case "down":
            tileInThisWay = this.stage[3 - j][i];
            break;
          case "right":
            tileInThisWay = this.stage[i][3 - j];
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
   * do a move in the specified direction
   */
  move(dir: "left" | "up" | "right" | "down"): void {
    let didMove = false;
    didMove = this.clear(dir);

    let scoreAdded = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        let objInThisWay: Tile;
        let objInThisWay2: Tile;
        switch (dir) {
          case "left": {
            objInThisWay = this.stage[i][j];
            objInThisWay2 = this.stage[i][j + 1];
            break;
          }
          case "up": {
            objInThisWay = this.stage[j][i];
            objInThisWay2 = this.stage[j + 1][i];
            break;
          }
          case "down": {
            objInThisWay = this.stage[3 - j][i];
            objInThisWay2 = this.stage[2 - j][i];
            break;
          }
          case "right": {
            objInThisWay = this.stage[i][3 - j];
            objInThisWay2 = this.stage[i][2 - j];
            break;
          }
        }

        if (objInThisWay2.boxObj && objInThisWay.boxObj?.value == objInThisWay2.boxObj.value) {
          scoreAdded += this.addTo(objInThisWay2, objInThisWay);
          this.clear(dir);
          didMove = true;
        }
      }
    }

    if (scoreAdded) {
      const addscore = document.getElementById("addScore");
      if (addscore) {
        addscore.innerText = "+" + scoreAdded;
        addscore.textContent = "+" + scoreAdded;
        addscore.classList.add("show");
        setTimeout(() => {
          addscore.classList.remove("show");
        }, 500);
      }
    }
    if (didMove) {
      this.newBox();
    }
    if (this.isEnd()) {
      this.gameOver();
    }
  }
}

/**
 * Get a controller for the {@link Game2048}
 *
 * @returns function utilities for making moves using mouse
 */
export function getController(gameObj: Game2048) {
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
    end(x: number, y: number) {
      ready = 0;
    }
  };
}
