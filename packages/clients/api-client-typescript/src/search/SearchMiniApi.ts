import { MiniApi, MiniApiProps } from "../MiniApi";
import * as naturalsearch from './NaturalSearch';

export interface ISearchClient {

  naturalSearch: (request: naturalsearch.NaturalSearchRequest) => Promise<naturalsearch.NaturalSearchResponse>

}

export class DefaultSearchClient extends MiniApi implements ISearchClient {

  constructor(props: MiniApiProps) {
    super(props);
  }

  naturalSearch = async (request: naturalsearch.NaturalSearchRequest) : Promise<naturalsearch.NaturalSearchResponse> =>
    await this.fetchApi<naturalsearch.NaturalSearchRequest, naturalsearch.NaturalSearchResponse>(
      `/search/natural?l=${encodeURI(request.LanguageCode)}&q=${encodeURI(request.SearchQuery)}`,
      'GET');
}