import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {NgForm} from "@angular/forms";
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "../service/app-constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @LocalStorage(AppConstants.NEW_GAME_LS) newGame: { full_name: string; user_id: string; rules: string; starting: string; game_id: string };
  @LocalStorage(AppConstants.GAME_LS) game: {
    game: { player_turn: string };
    opponent: { user_id: string; board: [string] };
    self: { user_id: string; board: [string] }
  };

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
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
    this.gameService.getGameStatus(this.newGame.game_id).subscribe((game) => {
      this.game = game;
    });
  }

}
