import {EnumRules} from "./enum-rules.enum";
import {AppConstants} from "../service/app-constants";
import {Board} from "./board";
import {Cell} from "./cell";

export class Rules {
  rules: EnumRules;
  xShotCount: number;
  restShots: number;

  constructor(rules: string) {
    if (!rules) {
      rules = 'standard';
    }
    if (rules.indexOf('shot') >= 0) {
      this.xShotCount = +rules.split('-')[0];
      this.rules = EnumRules.X_SHOT;
    } else {
      switch (rules) {
        case 'standard':
          this.rules = EnumRules.STANDARD;
          break;
        case 'super-charge':
          this.rules = EnumRules.SUPER_CHARGE;
          break;
        case 'desperation':
          this.rules = EnumRules.DESPERATION;
          break;
      }
    }
  }

  updateRestShots(salvo: [Cell], player: Board) {
    let salvoLength = salvo != null ? salvo.length : 0;
    switch (this.rules) {
      case EnumRules.STANDARD:
        this.restShots = player.shipCount - salvoLength;
        break;
      case EnumRules.X_SHOT:
        this.restShots = this.xShotCount - salvoLength;
        break;
      case EnumRules.DESPERATION:
        this.restShots = AppConstants.SHIP_COUNT - player.opponent.shipCount + 1 - salvoLength;
        break;
      case EnumRules.SUPER_CHARGE:
        this.restShots = (player.awarded ? player.shipCount : 0) + player.shipCount - salvoLength;
        break;
    }
  }
}
