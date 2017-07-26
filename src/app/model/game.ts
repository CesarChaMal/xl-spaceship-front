import {Board} from "./board";
import {Rules} from "app/model/rules";

export class Game {
  game: { player_turn: string };
  opponent: Board;
  self: Board;
  rules: Rules;

  constructor(game: { player_turn: string }, self: Board, opponent: Board) {
    this.game = game;
    this.opponent = opponent;
    this.self = self;
  }
}
