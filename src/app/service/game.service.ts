import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AppConstants} from "./app-constants";
import 'rxjs/Rx';
import {Game} from "../model/game";
import {Board} from "../model/board";
import {Coords} from "../model/coords";

@Injectable()
export class GameService {

  salvo = [];

  constructor(private http: Http) { }

  newGame(request: {user_id: string; full_name: string; rules?: string;}) {
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
        let opponent = body.opponent;
        let selfBoard = new Board(self.user_id, self.board);
        let opponentBoard = new Board(opponent.user_id, opponent.board);
        return new Game(body.game.player_turn, selfBoard, opponentBoard);
      })
  }

  prepSalvo(coords: Coords) {
    this.salvo.push(coords.toStr());
  }

  reSalvo(gameId) {
    return this.http.put(AppConstants.API_HOST
      + AppConstants.USER_RESOURCE
      + AppConstants.GAME_ID_RESOURCE
      + gameId
      + AppConstants.GAME_FIRE_RESOURCE,
      {salvo: this.salvo})
      .map((res) => {
        return res.json();
      })
  }

}
