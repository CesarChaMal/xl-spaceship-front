import { Injectable } from '@angular/core';
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "./app-constants";
import {Game} from "../model/game";
import {NewGameRequest} from "../model/new-game-request";
import {GameService} from "./game.service";
import {SalvoService} from "./salvo.service";

@Injectable()
export class DashboardService {
  newGame: NewGameRequest;
  game: Game;
  @LocalStorage(AppConstants.OPPONENT_SHIP_COUNT_LS) opponentShipCount;
  @LocalStorage(AppConstants.SELF_SHIP_COUNT_LS) selfShipCount;
  @LocalStorage(AppConstants.PLAYER_TURN_LS) player_turn;
  @LocalStorage(AppConstants.GAME_OVER_LS) gameOver: boolean;

  constructor(private gameService: GameService, private salvoService: SalvoService) { }

  startNewGame(game: NewGameRequest) {
    this.opponentShipCount = this.selfShipCount = AppConstants.SHIP_COUNT;
    this.newGame = game;
    this.player_turn = game.starting;
    this.gameOver = false;
    this.updateGame();
  }

  updateGame() {
    if (!this.newGame) {
      return;
    }
    this.gameService.getGameStatus(this.newGame.game_id)
      .subscribe((game) => {
        game.self.shipCount = this.selfShipCount;
        game.opponent.shipCount = this.opponentShipCount;
        game.self.opponent = game.opponent;
        game.opponent.opponent = game.self;
        this.salvoService.useSelfBoard(this.newGame.rules, game.self);
        this.salvoService.useOpponentBoard(this.newGame.rules, game.opponent);
        this.game = game;
      });
  }

  get gameId() {
    return this.newGame.game_id;
  }

  salvoTo(res, opponent: boolean) {
    if (res.game.player_turn) {
      this.player_turn = res.game.player_turn;
    } else {
      this.player_turn = res.game.won;
      this.gameOver = true;
    }
    let opponentBoard = this.game[opponent ? 'opponent' : 'self'];
    let selfBoard = this.game[!opponent ? 'opponent' : 'self'];
    this.opponentShipCount = opponentBoard.markSalvo(res.salvo);
    opponentBoard.opponent = selfBoard;
    selfBoard.opponent = opponentBoard;
    this.salvoService.updateOpponentRestShots();
    this.salvoService.updateRestShots();
  }

  playerTurn(user_id) {
    if (!this.player_turn) {
      return false;
    }
    return this.player_turn === user_id;
  }

}
