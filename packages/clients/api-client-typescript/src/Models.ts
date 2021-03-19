import * as search from './search';
import * as my from './my';

export interface IHerculesApi {

  search: search.ISearchClient;
  myGames: my.IMyGamesClient;

}