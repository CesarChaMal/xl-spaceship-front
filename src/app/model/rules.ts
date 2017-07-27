import {EnumRules} from "./enum-rules.enum";
import {AppConstants} from "../service/app-constants";
import {Board} from "./board";
import {Cell} from "./cell";

export class Rules {
  rules: EnumRules;
  xShotCount: number;

  constructor(rules: string) {
    if (!rules) {
      rules = 'standard';
    }
    console.log('create rules');
    console.log(rules);
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

  getRestShots(salvo: [Cell], player: Board) {
    let salvoLength = salvo != null ? salvo.length : 0;
    switch (this.rules) {
      case EnumRules.STANDARD:
        return player.shipCount - salvoLength;
      case EnumRules.X_SHOT:
        return this.xShotCount - salvoLength;
      case EnumRules.DESPERATION:
        return AppConstants.SHIP_COUNT - player.opponentShipCount + 1 - salvoLength;
    }
  }

}
