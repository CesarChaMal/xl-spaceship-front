import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AppConstants} from "./app-constants";
import 'rxjs/Rx';

@Injectable()
export class GameService {

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
        return res.json();
      })
  }
}
