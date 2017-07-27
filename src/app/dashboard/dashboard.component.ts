import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {NgForm} from "@angular/forms";
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "../service/app-constants";
import {SalvoService} from "../service/salvo.service";
import {DashboardService} from "../service/dashboard.service";
import {RulesService} from "../service/rules.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @LocalStorage(AppConstants.CURRENT_RULE_LS) rule;
  @LocalStorage(AppConstants.X_SHOT_LS) xShot: number;
  xShotNotInRange: boolean = false;
  rules = [];

  constructor(private dashboardService: DashboardService,
              private gameService: GameService,
              private rulesService: RulesService,
              private salvoService: SalvoService) {
  }

  ngOnInit() {
    if (!this.rule) {
      this.rule = 'standard';
    }
    this.rules.push('standard', 'X-shot', 'super-charge', 'desperation');
    this.dashboardService.updateGame();
  }

  onNewGame(form: NgForm) {
    let request = form.form.value;
    if (this.rule.indexOf('shot') >= 0) {
      if (this.xShot >= 1 && this.xShot <= 10){
        this.rule = this.xShot + '-shot';
        this.xShotNotInRange = false;
      } else {
        this.xShotNotInRange = true;
        return;
      }
    }
    request.rules = this.rule;
    this.gameService.newGame(request)
      .subscribe((game) => {
        this.dashboardService.startNewGame(game);
      });
  }


  onReSalvo() {
    this.salvoService.reSalvo(this.dashboardService.gameId)
      .subscribe((res) => {
        this.dashboardService.salvoTo(res, true);
      });
  }


  onRedUpon() {
    this.salvoService.redUpon(this.dashboardService.gameId)
      .subscribe((res) => {
        this.dashboardService.salvoTo(res, false);
      });
  }

  playerTurn(user_id) {
    return this.dashboardService.playerTurn(user_id);
  }

  getRestShots() {
    return this.rulesService.rules.restShots;
  }

  onAutopilot() {
    this.gameService.autopilot(this.dashboardService.gameId)
      .subscribe((res) => {
        this.dashboardService.salvoTo(res, true);
      })
  }

  get game() {
    return this.dashboardService.game;
  }
}
