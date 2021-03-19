import { MiniApi, MiniApiProps } from "../MiniApi";
import * as games from './Games';

export interface IMyGamesClient {

  putGame: (request: games.PutGameRequest) => Promise<games.PutGameResponse>

}

export class DefaultMyGamesClient extends MiniApi implements IMyGamesClient {

  constructor(props: MiniApiProps) {
    super(props);
  }

  putGame = async  (request: games.PutGameRequest) : Promise<games.PutGameResponse> =>
    await this.fetchApiPostRaw<games.PutGameRequest, games.PutGameResponse>(
      `/my/games/?path=${encodeURI(request.path)}`,
      'POST',
      Buffer.from(request.pgn, 'utf8'),
      'application/x-chess-pgn');
}