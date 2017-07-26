import {EnumRules} from "./enum-rules.enum";
import {AppConstants} from "../service/app-constants";
import {Board} from "./board";
import {Cell} from "./cell";

export class Rules {
  rules: EnumRules;
  xShotCount: number;

  constructor(rules: string) {
    this.rules = EnumRules[rules];
    if (this.rules == EnumRules.X_SHOT) {
      this.xShotCount = +rules.split('-')[0];
    }
  }

  getRestShots(salvo: [Cell]) {
    switch (this.rules) {
      case EnumRules.STANDARD:
        return player.shipCount - salvo.length;
      case EnumRules.X_SHOT:
        return this.xShotCount - salvo.length;
      case EnumRules.DESPERATION:
        return AppConstants.SHIP_COUNT - player.opponentShipCount + 1 - salvo.length;
    }
  }

}
