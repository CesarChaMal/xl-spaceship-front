import { Injectable } from '@angular/core';
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "./app-constants";
import {Game} from "../model/game";
import {NewGameRequest} from "../model/new-game-request";
import {GameService} from "./game.service";
import {RulesService} from "./rules.service";
import {SalvoService} from "./salvo.service";

@Injectable()
export class DashboardService {
  @LocalStorage(AppConstants.NEW_GAME_LS) newGame: NewGameRequest;
  @LocalStorage(AppConstants.GAME_LS) game: Game;
  @LocalStorage(AppConstants.OPPONENT_SHIP_COUNT_LS) opponentShipCount;
  @LocalStorage(AppConstants.SELF_SHIP_COUNT_LS) selfShipCount;
  @LocalStorage(AppConstants.PLAYER_TURN_LS) player_turn;
  @LocalStorage(AppConstants.GAME_OVER_LS) gameOver: boolean;

  constructor(private gameService: GameService, private salvoService: SalvoService, private rulesService: RulesService) { }

  startNewGame(game: NewGameRequest) {
    this.opponentShipCount = this.selfShipCount = AppConstants.SHIP_COUNT;
    this.newGame = game;
    this.player_turn = game.starting;
    this.gameOver = false;
    this.rulesService.useRules(game.rules);
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
        game.self.opponentShipCount = game.opponent.shipCount;
        game.opponent.opponentShipCount = game.self.shipCount;
        this.salvoService.useSelfBoard(game.self);
        this.salvoService.useOpponentBoard(game.opponent);
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
    this.opponentShipCount = this.game[opponent ? 'opponent' : 'self'].markSalvo(res.salvo);
  }

  playerTurn(user_id) {
    if (!this.player_turn) {
      return false;
    }
    return this.player_turn === user_id;
  }

}
