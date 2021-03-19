import { MiniApi, MiniApiProps } from "../MiniApi";
import * as naturalsearch from './NaturalSearch';
import * as skeletonsearch from './SkeletonSearch';

export interface ISearchClient {

  naturalSearch: (request: naturalsearch.NaturalSearchRequest) => Promise<naturalsearch.NaturalSearchResponse>
  skeletonSearch: (request: skeletonsearch.SkeletonSearchRequest) => Promise<skeletonsearch.SkeletonSearchResponse>
}

export class DefaultSearchClient extends MiniApi implements ISearchClient {

  constructor(props: MiniApiProps) {
    super(props);
  }

  naturalSearch = async (request: naturalsearch.NaturalSearchRequest) : Promise<naturalsearch.NaturalSearchResponse> =>
    await this.fetchApi<naturalsearch.NaturalSearchRequest, naturalsearch.NaturalSearchResponse>(
      `/search/natural?l=${encodeURI(request.LanguageCode)}&q=${encodeURI(request.SearchQuery)}`,
      'GET');

  skeletonSearch = async (request: skeletonsearch.SkeletonSearchRequest) : Promise<skeletonsearch.SkeletonSearchResponse> => 
      await this.fetchApi<skeletonsearch.SkeletonSearchRequest, skeletonsearch.SkeletonSearchResponse>(
        `/search/skeleton`, 'POST', request);
}