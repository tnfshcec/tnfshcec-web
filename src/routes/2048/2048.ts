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

  initStage() {
    for (var cell = 0; cell < 4; cell++) {
      this.stage[cell] = [];
      for (var row = 0; row < 4; row++) {
        this.stage[cell][row] = {
          boxObj: null,
          position: [cell, row]
        };
      }
    }
  }

  empty() {
    var emptyList = [];
    for (var row = 0; row < 4; row++) {
      for (var cell = 0; cell < 4; cell++) {
        if (this.stage[cell][row].boxObj == null) {
          emptyList.push(this.stage[cell][row]);
        }
      }
    }
    return emptyList;
  }

  newBox() {
    const createBox = function (num: number, position: [number, number]) {
      const domBox = document.createElement("span");
      domBox.innerText = num.toString();
      domBox.textContent = num.toString();
      domBox.classList.add(`row${position[0]}`);
      domBox.classList.add(`cell${position[1]}`);
      domBox.classList.add(`tile`);

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

  isEnd() {
    var emptyList = this.empty();
    if (!emptyList.length) {
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          var obj = this.stage[i][j];
          var objLeft = j == 0 ? { boxObj: { value: 0 } } : this.stage[i][j - 1];
          var objRight = j == 3 ? { boxObj: { value: 0 } } : this.stage[i][j + 1];
          var objUp = i == 0 ? { boxObj: { value: 0 } } : this.stage[i - 1][j];
          var objDown = i == 3 ? { boxObj: { value: 0 } } : this.stage[i + 1][j];
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
    return false;
  }

  gameOver() {
    alert("GAVE OVER!");
  }

  moveTo(obj1: Tile, obj2: Tile) {
    obj2.boxObj = obj1.boxObj;

    if (obj2.boxObj)
      obj2.boxObj.domObj.className = `row${obj2.position[0]} cell${obj2.position[1]} num${obj2.boxObj?.value} tile`;

    obj1.boxObj = null;
  }

  addTo(obj1: Tile, obj2: Tile) {
    obj2.boxObj?.domObj.parentNode?.removeChild(obj2.boxObj.domObj);
    obj2.boxObj = obj1.boxObj;
    obj1.boxObj = null;
    if (obj2.boxObj) {
      obj2.boxObj.value = obj2.boxObj?.value * 2;
      obj2.boxObj.domObj.className = `row${obj2.position[0]} cell${obj2.position[1]} num${obj2.boxObj?.value} tile`;
      obj2.boxObj.domObj.innerText = obj2.boxObj.value.toString();
      obj2.boxObj.domObj.textContent = obj2.boxObj.value.toString();
      this.points.score += obj2.boxObj.value;
    }
    const scoreBar = document.getElementById("score");
    if (scoreBar) {
      scoreBar.innerText = this.points.score.toString();
      scoreBar.textContent = this.points.score.toString();
    }
    return obj2.boxObj?.value ?? 0;
  }

  // TODO: change this api
  clear(x: 0 | 1, y: 0 | 1) {
    var can = 0;
    for (var i = 0; i < 4; i++) {
      var fst = null;
      var fstEmpty = null;
      for (var j = 0; j < 4; j++) {
        var objInThisWay = null;
        switch ("" + x + y) {
          case "00":
            objInThisWay = this.stage[i][j];
            break;
          case "10":
            objInThisWay = this.stage[j][i];
            break;
          case "11":
            objInThisWay = this.stage[3 - j][i];
            break;
          case "01":
            objInThisWay = this.stage[i][3 - j];
            break;
        }
        if (objInThisWay?.boxObj != null) {
          if (fstEmpty) {
            this.moveTo(objInThisWay, fstEmpty);
            fstEmpty = null;
            j = 0;
            can = 1;
          }
        } else if (!fstEmpty) {
          fstEmpty = objInThisWay;
        }
      }
    }
    return can;
  }

  // TODO: change this api
  move(x: 0 | 1, y: 0 | 1) {
    var can = 0;
    can = this.clear(x, y) ? 1 : 0;
    var add = 0;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        var objInThisWay = null;
        var objInThisWay2 = null;
        switch ("" + x + y) {
          case "00": {
            objInThisWay = this.stage[i][j];
            objInThisWay2 = this.stage[i][j + 1];
            break;
          }
          case "10": {
            objInThisWay = this.stage[j][i];
            objInThisWay2 = this.stage[j + 1][i];
            break;
          }

          case "11": {
            objInThisWay = this.stage[3 - j][i];
            objInThisWay2 = this.stage[2 - j][i];
            break;
          }
          case "01": {
            objInThisWay = this.stage[i][3 - j];
            objInThisWay2 = this.stage[i][2 - j];
            break;
          }
        }
        if (objInThisWay2?.boxObj && objInThisWay?.boxObj?.value == objInThisWay2.boxObj.value) {
          add += this.addTo(objInThisWay2, objInThisWay);
          this.clear(x, y);
          can = 1;
        }
      }
    }
    if (add) {
      const addscore = document.getElementById("addScore");
      if (addscore) {
        addscore.innerText = "+" + add;
        addscore.textContent = "+" + add;
        addscore.className = "show";
        setTimeout(function () {
          addscore.className = "hide";
        }, 500);
      }
    }
    if (can) {
      this.newBox();
    }
    if (this.isEnd()) {
      this.gameOver();
    }
  }
}

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
        gameObj.move(0, 1);
        ready = 0;
      } else if (startX - x > 100 && ready) {
        gameObj.move(0, 0);
        ready = 0;
      } else if (startY - y > 100 && ready) {
        gameObj.move(1, 0);
        ready = 0;
      } else if (y - startY > 100 && ready) {
        gameObj.move(1, 1);
        ready = 0;
      }
    },
    end(x: number, y: number) {
      ready = 0;
    }
  };
}
