import {Injectable} from '@angular/core';
import {Rules} from "../model/rules";
import {Board} from "../model/board";
import {Cell} from "../model/cell";
import {LocalStorage} from "ngx-webstorage";
import {AppConstants} from "./app-constants";

@Injectable()
export class RulesService {

  @LocalStorage(AppConstants.RULES_LS) rulesStr: string;
  rules: Rules;

  constructor() {
    if (this.rulesStr) {
      this.rules = new Rules(this.rulesStr);
    }
  }

  useRules(rules: string) {
    this.rulesStr = rules;
    this.rules = new Rules(rules);
  }

  /**
   * Return left salvos allowed by rules
   * @param salvo
   * @param board
   * @returns {number}
   */
  getRestShots(salvo: [Cell], board: Board) {
    return this.rules.getRestShots(salvo, board);
  }
}
