import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as models from './Models';
import * as mini from './MiniApi';
import * as search from './search';

export interface HerculesApiClientProps {
  endpoint: string,
  authorizer: () => Promise<string>
}

export class HerculesApiClient implements models.IHerculesApi {

  private readonly client : AxiosInstance;

  constructor(props: HerculesApiClientProps) {
    this.client = axios.create({
      baseURL: `https://${props.endpoint}`
    });
    this.client.interceptors.request.use((req: AxiosRequestConfig) => mini.MiniApi.requestInterceptor(req));
    this.client.interceptors.response.use((res: AxiosResponse) => mini.MiniApi.responseInterceptor(res));
  }

  get search() : search.ISearchClient {
    return this.search;
  }
}