import {EnumCellType} from "./enum-cell-type.enum";
import {Coords} from "./coords";

export class Cell {
  coords: Coords;
  type: EnumCellType;
  marked: boolean;

  constructor(coords: Coords, type: EnumCellType) {
    this.coords = coords;
    this.type = type;
  }
}
