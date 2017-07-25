import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {NgForm} from "@angular/forms";
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "../service/app-constants";
import {Game} from "app/model/game";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @LocalStorage(AppConstants.NEW_GAME_LS) newGame: {
    full_name: string;
    user_id: string;
    rules: string;
    starting: string;
    game_id: string
  };
  @LocalStorage(AppConstants.GAME_LS) game: Game;
  @LocalStorage(AppConstants.SALVO_RESPONSE_LS) salvoResponse: {
    salvo: { [key: string]: string },
    game: {
      player_turn: string
    }
  };

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.updateGame();
  }

  onNewGame(form: NgForm) {
    console.log(form.form.value);
    this.gameService.newGame(form.form.value).subscribe((game) => {
      this.newGame = game;
      this.updateGame();
    });
  }

  updateGame() {
    if (!this.newGame) {
      return;
    }
    this.gameService.getGameStatus(this.newGame.game_id)
      .subscribe((game) => {
        this.game = game;
      });
  }

  onReSalvo() {
    this.gameService.reSalvo(this.newGame.game_id)
      .subscribe((res) => {
        this.salvoResponse = res;
        this.game.opponent.markSalvo(res.salvo);
      });
  }

  playerTurn(user_id) {
    if (!this.salvoResponse) {
      return false;
    }
    return this.salvoResponse.game.player_turn === user_id;
  }

}
