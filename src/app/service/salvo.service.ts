import {Injectable, ReflectiveInjector} from '@angular/core';
import {Cell} from "../model/cell";
import {AppConstants} from "./app-constants";
import {Http} from "@angular/http";
import {Board} from "../model/board";
import {
  BoardToken, rulesServiceFactory, rulesServiceProvider, RulesServiceToken,
  RulesToken
} from "./rules-service.provider";
import {RulesService} from "./rules.service";

@Injectable()
export class SalvoService {
  salvo = [];
  private selfRulesService;
  private opponentRulesService;

  constructor(private http: Http) {
  }

  useSelfBoard(rules: string, board: Board) {
    this.selfRulesService = new RulesService(rules, board);
    this.updateRestShots();
  }

  useOpponentBoard(rules: string, board: Board) {
    this.opponentRulesService = new RulesService(rules, board);
    this.opponentRulesService.updateRestShots(null);
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
  playerSalvo(gameId) {
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
        this.opponentRulesService.updateRestShots(null);
        this.salvo = [];
        return res.json();
      })
  }

  /**
   * Opponent's salvo
   * @param {string} gameId
   * @returns {Observable<any | Promise<any>>}
   */
  opponentSalvo(gameId: string) {
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
    this.selfRulesService.updateRestShots(<[Cell]>this.salvo);
  }

  updateOpponentRestShots() {
    this.opponentRulesService.updateRestShots(null);
  }

  get selfRestShots() {
    if (this.selfRulesService) {
      return this.selfRulesService.rules.restShots;
    }
  }

}
