import {Injectable} from '@angular/core';
import {Cell} from "../model/cell";
import {AppConstants} from "./app-constants";
import {Http} from "@angular/http";
import {Board} from "../model/board";
import {RulesService} from "./rules.service";

@Injectable()
export class SalvoService {
  salvo = [];
  selfBoard: Board;
  opponentBoard: Board;

  constructor(private selfRulesService: RulesService,
              private opponentRulesService: RulesService,
              private http: Http) {
  }

  useSelfBoard(board: Board) {
    this.selfBoard = board;
    this.updateRestShots();
  }

  useOpponentBoard(board: Board) {
    this.opponentBoard = board;
    this.opponentRulesService.updateRestShots(null, this.opponentBoard);
  }

  prepSalvo(cell: Cell) {
    if (this.selfRulesService.rules.restShots <= 0) {
      return false;
    }
    if (this.salvo.indexOf(cell) == -1) {
      this.salvo.push(cell);
      this.updateRestShots();
      return true;
    }
    return false;
  }

  /**
   * User's salvo
   * @param gameId
   * @returns {Observable<any | Promise<any>>}
   */
  reSalvo(gameId) {
    let salvoCoords = this.salvo.map((cell) => {
      return cell.coords.toStr();
    });
    return this.http.put(AppConstants.API_HOST
      + AppConstants.USER_RESOURCE
      + AppConstants.GAME_ID_RESOURCE
      + gameId
      + AppConstants.GAME_FIRE_RESOURCE,
      {salvo: salvoCoords})
      .map((res) => {
        this.salvo.forEach((cell) => {
          cell.marked = false;
        });
        this.opponentRulesService.updateRestShots(null, this.opponentBoard);
        this.salvo = [];
        return res.json();
      })
  }

  /**
   * Opponent's salvo
   * @param {string} gameId
   * @returns {Observable<any | Promise<any>>}
   */
  redUpon(gameId: string) {
    let salvo = [];
    for (let i = 0; i < this.opponentRulesService.rules.restShots; i++) {
      let x = Math.random().toString(16).substr(2, 1);
      let y = Math.random().toString(16).substr(2, 1);
      salvo.push(`${y}x${x}`);
    }
    return this.http
      .put(AppConstants.API_HOST
        + AppConstants.PROTOCOL_RESOURCE
        + AppConstants.PROTOCOL_CATCH_SALVO_RESOURCE
        + gameId,
        {salvo: salvo})
      .map((res) => {
        return res.json();
      })
  }

  updateRestShots() {
    this.selfRulesService.updateRestShots(<[Cell]>this.salvo, this.selfBoard);
  }

}
