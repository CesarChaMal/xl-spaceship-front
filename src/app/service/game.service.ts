import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AppConstants} from "./app-constants";
import 'rxjs/Rx';
import {Game} from "../model/game";
import {Board} from "../model/board";

@Injectable()
export class GameService {

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
        let selfBoard = new Board(self.user_id, self.board, AppConstants.SHIP_COUNT);
        let opponentBoard = new Board(opponent.user_id, opponent.board, AppConstants.SHIP_COUNT);
        return new Game(body.game.player_turn, selfBoard, opponentBoard);
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
