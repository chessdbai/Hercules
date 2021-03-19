import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as models from './Models';
import * as mini from './MiniApi';
import * as search from './search';
import * as my from './my';

export interface HerculesApiClientProps {
  endpoint: string,
  authorizer: () => Promise<string>
}

export class HerculesApiClient implements models.IHerculesApi {

  private readonly client : AxiosInstance;
  private readonly searchClient : search.ISearchClient; 
  private readonly myGamesClient : my.IMyGamesClient;

  constructor(props: HerculesApiClientProps) {
    this.client = axios.create({
      baseURL: `https://${props.endpoint}`
    });
    this.client.interceptors.request.use((req: AxiosRequestConfig) => mini.MiniApi.requestInterceptor(req));
    this.client.interceptors.response.use((res: AxiosResponse) => mini.MiniApi.responseInterceptor(res));

    var miniProps : mini.MiniApiProps = {
      client: this.client,
      authorizer: props.authorizer
    };
    this.searchClient = new search.DefaultSearchClient(miniProps);
    this.myGamesClient = new my.DefaultMyGamesClient(miniProps);
  }

  get search() : search.ISearchClient {
    return this.searchClient;
  }

  get myGames() : my.IMyGamesClient {
    return this.myGamesClient;
  }
}