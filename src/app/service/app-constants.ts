export class AppConstants {

  static BOARD_SIZE = 16;

  static API_HOST = 'http://localhost:8080';

  static USER_RESOURCE = '/xl-spaceship/user';
  static PROTOCOL_RESOURCE = '/xl-spaceship/protocol';

  static GAME_FIRE_RESOURCE = '/fire';
  static GAME_AUTOPILOT_RESOURCE = '/game/';
  static GAME_NEW_RESOURCE = '/game/new';
  static PROTOCOL_CATCH_SALVO_RESOURCE = '/game/';
  static PROTOCOL_GAME_NEW_RESOURCE = '/game/new';
  static GAME_ID_RESOURCE = '/game/';

  static NEW_GAME_LS = 'newgame';
  static GAME_LS = 'game';
  static SALVO_RESPONSE_LS = 'salvoresponse';
  static OPPONENT_SHIP_COUNT_LS = 'opponentshipcount';
  static SELF_SHIP_COUNT_LS = 'selfshipcount';
  static SHIP_COUNT = 5;
  static PLAYER_TURN_LS = 'playerturn';
  static GAME_OVER_LS = 'gameover';
  static CURRENT_RULE_LS = 'currentrule';
}
