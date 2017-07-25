import {Cell} from "./cell";
import {AppConstants} from "../service/app-constants";

export class Board {

  board: Cell[][] = new Array<Cell[]>(AppConstants.BOARD_SIZE);
}
