import {Cell} from "./cell";
import {Coords} from "./coords";
import {EnumCellType} from "./enum-cell-type.enum";

export class Board {
  user_id: string;
  board: Cell[][];
  shipCount:number;
  xShotCount: number;
  opponentShipCount: number;

  constructor(userId: string, board: [string], shipCount: number) {
    this.user_id = userId;
    this.board = [];
    this.shipCount = shipCount;
    for (let i = 0; i < board.length; i++) {
      let chars = board[i].split('');
      let row = [];
      // parse row of board
      for (let j = 0; j < chars.length; j++) {
        let chr = chars[j];
        let cell: Cell;
        switch (chr) {
          case '*':
            cell = new Cell(new Coords(i, j), EnumCellType.SHIP);
            break;
          case '-':
            cell = new Cell(new Coords(i, j), EnumCellType.MISS);
            break;
          case 'x':
            cell = new Cell(new Coords(i, j), EnumCellType.HIT);
            break;
          case '.':
            cell = new Cell(new Coords(i, j), EnumCellType.UNKNOWN);
            break;
        }
        row.push(cell);
      }
      this.board.push(row);
    }
  }

  markSalvo(res: { [key: string]: string }) {
    this.board.forEach((row)=>{
      row.forEach((cell) => {
        let cellHexCoords = cell.coords.toStr();
        let keys = Object.keys(res);
        let keyOfHit = keys.indexOf(cellHexCoords);
        if (keyOfHit != -1) {
          let goal = res[keys[keyOfHit]];
          switch(goal) {
            case 'hit':
              cell.type = EnumCellType.HIT;
              break;
            case 'miss':
              cell.type = EnumCellType.MISS;
              break;
            case 'kill':
              cell.type = EnumCellType.HIT;
              this.shipCount--;
              break;
          }
        }
      })
    });
    return this.shipCount;
  }
}
