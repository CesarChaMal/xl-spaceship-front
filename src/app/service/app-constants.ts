export class AppConstants {

  static BOARD_SIZE = 16;

  static API_HOST = 'http://localhost:8080';

  static USER_RESOURCE = '/xl-spaceship/user';
  static PROTOCOL_RESOURCE = '/xl-spaceship/protocol';

  static GAME_FIRE_RESOURCE = '/game/{gameId}/fire';
  static GAME_AUTOPILOT_RESOURCE = '/game/{gameId}/auto';
  static GAME_NEW_RESOURCE = '/game/new';
  static PROTOCOL_CATCH_SALVO_RESOURCE = '/game/{gameId}';
  static PROTOCOL_GAME_NEW_RESOURCE = '/game/new';
  static GAME_ID_RESOURCE = '/game/';

  static NEW_GAME_LS = 'newgame';
  static GAME_LS = 'game';
}
