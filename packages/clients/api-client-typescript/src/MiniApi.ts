import { retry } from '@lifeomic/attempt';
import axios, { Method, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as errors from './errors';
import * as utils from './utils';

export interface MiniApiProps {
  client: AxiosInstance,
  authorizer: () => Promise<string>
}

export abstract class MiniApi {

  protected readonly authorizer : () => Promise<string>;
  protected readonly client : AxiosInstance;

  constructor(props: MiniApiProps) {
    this.authorizer = props.authorizer;
    this.client = props.client;
  }

  protected fetchApi = async <TReq, TRes>(resource: string, method: Method, content?: TReq) : Promise<TRes> => {
    const me = this;
    return await retry(async function() {
      return await me.fetchApiNoRetry(resource, method, content);
    }, {
      delay: 200,
      factor: 2,
      maxAttempts: 4,
      handleError (err, context) {
        const error = err as AxiosError;
        var retryable = false;
        if (error.response !== undefined) {
          const status = error.response!.status!;
          retryable = status >= 400 && status < 500;
        }
        if (retryable === false) {
          // We should abort because error indicates that request is not retryable
          context.abort();
        }
      }
    });
  }

  protected fetchApiNoRetry = async <TReq, TRes>(resource: string, method: Method, content?: TReq) : Promise<TRes> => {
    try {
      return await this.client.request({
        url: resource,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await this.authorizer()
        },
        data: content !== undefined ? content! : null
      });
    } catch (err) {
      const error = err as AxiosError;

      if (error.response !== undefined) {
        const response = error.response!;
        MiniApi.responseInterceptor(response);
      }

      throw err;
    }
  }


  public static requestInterceptor = (req: AxiosRequestConfig) : AxiosRequestConfig => {
    if (req.data !== undefined) {
      req.data = utils.jsonToUpper(req.data!);
    }
    return req;
  }

  public static responseInterceptor = (res: AxiosResponse) : AxiosResponse => {

    var ok = res.status >= 200 && res.status < 300;

    var data = res.data;
    if (data !== undefined) {
      data = utils.jsonToLower(data);
    }

    if (!ok) {
      var errorType = data.type;
      var msg = data.message;
      const error = errors.errorFactory({
        type: errorType,
        message: msg,
        statusCode: res.status
      });
      throw error;
    }

    res.data = data;
    return res;
  }


}