import { Injectable } from '@angular/core';
import {Cell} from "../model/cell";
import {AppConstants} from "./app-constants";
import {Http} from "@angular/http";
import {Board} from "../model/board";
import {RulesService} from "./rules.service";

@Injectable()
export class SalvoService {
  salvo = [];

  constructor(private rulesService: RulesService, private http: Http) { }

  prepSalvo(cell: Cell) {
    if (this.salvo.indexOf(cell) == -1) {
      this.salvo.push(cell);
    }
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
        this.salvo = [];
        return res.json();
      })
  }

  /**
   * Opponent's salvo
   * @param {string} gameId
   * @param opponentShipCount
   * @returns {Observable<any | Promise<any>>}
   */
  redUpon(gameId: string, opponentShipCount: number) {
    let salvo = [];
    for (let i = 0; i < opponentShipCount; i++) {
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

  getRestSalvo(board: Board) {
    return this.rulesService.getRestShots(<[Cell]>this.salvo, board);
  }
}
