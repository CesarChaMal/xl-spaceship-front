import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AppConstants} from "./app-constants";
import 'rxjs/Rx';
import {Game} from "../model/game";
import {Player} from "../model/board";
import {Coords} from "../model/coords";

@Injectable()
export class GameService {

  salvo = [];

  constructor(private http: Http) {
  }

  newGame(request: { user_id: string; full_name: string; rules?: string; }) {
    return this.http.post(AppConstants.API_HOST + AppConstants.PROTOCOL_RESOURCE + AppConstants.PROTOCOL_GAME_NEW_RESOURCE, request)
      .map((res) => {
        return res.json();
      });
  }

  getGameStatus(gameId: string) {
    return this.http.get(AppConstants.API_HOST + AppConstants.USER_RESOURCE + AppConstants.GAME_ID_RESOURCE + gameId)
      .map((res) => {
        let body = res.json();
        let self = body.self;
        if (self == null)
          throw {message: 'Game is not started'};
        let opponent = body.opponent;
        let selfBoard = new Player(self.user_id, self.board, AppConstants.SHIP_COUNT);
        let opponentBoard = new Player(opponent.user_id, opponent.board, AppConstants.SHIP_COUNT);
        return new Game(body.game.player_turn, selfBoard, opponentBoard);
      })
  }

  prepSalvo(coords: Coords) {
    if (this.salvo.indexOf(coords.toStr()) == -1) {
      this.salvo.push(coords.toStr());
    }
  }

  reSalvo(gameId) {
    return this.http.put(AppConstants.API_HOST
      + AppConstants.USER_RESOURCE
      + AppConstants.GAME_ID_RESOURCE
      + gameId
      + AppConstants.GAME_FIRE_RESOURCE,
      {salvo: this.salvo})
      .map((res) => {
        this.salvo = [];
        return res.json();
      })
  }

  getRestShots(player: Player) {
    return player.shipCount - this.salvo.length;
  }

  redUpon(gameId: string, salvo) {
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

  autopilot(gameId: string) {
    return this.http
      .post(AppConstants.API_HOST
        + AppConstants.USER_RESOURCE
        + AppConstants.GAME_AUTOPILOT_RESOURCE
        + gameId
        + '/auto', {})
      .map((res) => {
        return res.json();
      });
  }
}
