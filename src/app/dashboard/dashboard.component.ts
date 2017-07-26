import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {NgForm} from "@angular/forms";
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "../service/app-constants";
import {Game} from "app/model/game";
import {Board} from "../model/board";
import {Rules} from "../model/rules";
import {EnumRules} from "../model/enum-rules.enum";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @LocalStorage(AppConstants.GAME_OVER_LS) gameOver: boolean;
  @LocalStorage(AppConstants.NEW_GAME_LS) newGame: {
    full_name: string;
    user_id: string;
    rules: string;
    starting: string;
    game_id: string
  };
  @LocalStorage(AppConstants.GAME_LS) game: Game;
  @LocalStorage(AppConstants.PLAYER_TURN_LS) player_turn;
  @LocalStorage(AppConstants.OPPONENT_SHIP_COUNT_LS) opponentShipCount;
  @LocalStorage(AppConstants.SELF_SHIP_COUNT_LS) selfShipCount;
  @LocalStorage(AppConstants.CURRENT_RULE_LS) rule;

  rules = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    if (!this.rule) {
      this.rule = 'standard';
    }
    this.rules.push('standard', 'X-shot', 'super-charge', 'desperation');
    this.updateGame();
  }

  onNewGame(form: NgForm) {
    this.gameService.newGame(form.form.value)
      .subscribe((game) => {
        this.opponentShipCount = this.selfShipCount = AppConstants.SHIP_COUNT;
        this.newGame = game;
        this.player_turn = game.starting;
        this.gameOver = false;
        this.updateGame();
      });
  }

  updateGame() {
    if (!this.newGame) {
      return;
    }
    this.gameService.getGameStatus(this.newGame.game_id)
      .subscribe((game) => {
        game.opponent.shipCount = this.opponentShipCount;
        game.self.shipCount = this.selfShipCount;
        game.rules = new Rules(this.newGame.rules);
        this.game = game;
      });
  }

  onReSalvo() {
    this.gameService.reSalvo(this.newGame.game_id)
      .subscribe((res) => {
        this.salvoTo(res, this.game.opponent);
      });
  }

  private salvoTo(res, player: Board) {
    if (res.game.player_turn) {
      this.player_turn = res.game.player_turn;
    } else {
      this.player_turn = res.game.won;
      this.gameOver = true;
    }
    this.opponentShipCount = player.markSalvo(res.salvo);
  }

  onRedUpon() {
    let salvo = [];
    for (let i = 0; i < this.opponentShipCount; i++) {
      let x = Math.random().toString(16).substr(2, 1);
      let y = Math.random().toString(16).substr(2, 1);
      salvo.push(`${y}x${x}`);
    }
    this.gameService.redUpon(this.newGame.game_id, salvo)
      .subscribe((res) => {
        this.salvoTo(res, this.game.self);
      });
  }

  playerTurn(user_id) {
    if (!this.player_turn) {
      return false;
    }
    return this.player_turn === user_id;
  }

  getRestShots() {
    return this.gameService.getRestShots(this.game);
  }

  onAutopilot() {
    this.gameService.autopilot(this.newGame.game_id)
      .subscribe((res) => {
        this.salvoTo(res, this.game.opponent);
      })
  }
}
