import * as search from './search';

interface ErrorInfo {
  type: string,
  message: string,
  statusCode: number
}

type ErrorFactory = (msg: string, code: number) => Error;
type ErrorFactoryMap = {
  [index: string] : ErrorFactory
};

export class HerculesApiException extends Error {

  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // (1)
    this.name = "HerculesApiException";
    this.statusCode = statusCode;
  }
}
export class HerculesApiServiceException extends Error {

  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HerculesApiServiceException";
    this.statusCode = statusCode;
  }
}

var errorFactoryMap : ErrorFactoryMap = {};
errorFactoryMap['HerculesApiException'] = (msg: string, code: number) => new HerculesApiException(msg, code);
errorFactoryMap['HerculesApiServiceException'] = (msg: string, code: number) => new HerculesApiServiceException(msg, code);
errorFactoryMap['QueryUnderstandingException'] = (msg: string, code: number) => new search.QueryUnderstandingException(msg, code);

export const errorFactory = (info?: ErrorInfo) : Error => {

  var msg = (info === undefined || info.message === undefined) 
    ? 'An unknown error occurred while calling the Hercules API.'
    : info!.message!;
  var errType = (info === undefined || info.type === undefined || !(info!.type! in errorFactoryMap))
    ? 'HerculesApiException'
    : info!.type!;

  var code = (info === undefined || info.statusCode === undefined) 
    ? 500
    : info!.statusCode!;

  var factory = errorFactoryMap[errType]!;
  return factory(msg, code);
}