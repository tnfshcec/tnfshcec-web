import { Game2048 } from "./2048";

/**
 * 2048 Freesize Mode:
 * When changing the size, the tiles on the stage does NOT disappear as long as it's visible on the newly-sized stage.
 *
 * *the class might eventually get outdated, and the code here is pretty terrible (to read).*
 * *so good luck adventurer :)*
 */
export class Game2048Freesize extends Game2048 {
  override initStage(force = true): void {
    const biggerSize = Math.max(this.size, this.stage.length);
    for (let row = 0; row < biggerSize; row++) {
      if (force || this.stage[row] == undefined) {
        this.stage[row] = [];
      } else if (row >= this.size) {
        // previous size is bigger, remove the outsizing ones
        this.stage.splice(row);
        break;
      }

      for (let cell = 0; cell < biggerSize; cell++) {
        if (force || this.stage[row][cell] == undefined) {
          this.stage[row][cell] = {
            boxObj: null,
            position: [row, cell]
          };
        } else if (cell >= this.size) {
          // previous size is bigger, remove the outsizing ones
          this.stage[row].splice(cell);
          break;
        }
      }
    }
  }

  /**
   * Resets the game, optionally with a new size.
   * Initializes a new stage, and resets the score to 0.
   *
   * @param size A new size
   * @param force Overwrite every tile to be empty
   */
  override reset(size: number = this.size, force = true): void {
    this.stage.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell.boxObj != null && (force || rowIndex >= size || cellIndex >= size)) {
          cell.boxObj.domObj.remove();
          cell.boxObj = null;
        }
      });
    });

    this.size = size;

    this.initStage(force);

    this.score = 0;

    this.emit("score", this.score);
    this.emit("stageChange", this.stage);
  }
}
