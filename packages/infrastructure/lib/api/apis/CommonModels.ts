import * as cdk from '@aws-cdk/core';
import * as apig from '@aws-cdk/aws-apigateway';
import { CommonApiProps, makeModelForError } from './api-common';

export interface ApiError {
  name: string,
  statusCode: number,
  model: apig.Model
}

export const makeApiError = (construct: cdk.Construct, props: CommonModelsProps, name: string, description: string, statusCode: number) : ApiError => {
  const model = new apig.Model(construct, `${name}ErrorModel`, {
    schema:  makeModelForError(name),
    restApi: props.api,
    description: description,
    contentType: 'application/json',
    modelName: name
  });
  return {
    name: name,
    statusCode: statusCode,
    model: model
  }
}

interface CommonModelsProps {
  api: apig.IRestApi
}

export class CommonModels extends cdk.Construct {

  readonly accessDeniedError : ApiError;
    
  constructor(parent: cdk.Construct, name: string, props: CommonModelsProps) {
    super(parent, name);


    this.accessDeniedError = makeApiError(
      this,
      props,
      'AccessDeniedError',
      'An error thrown when the game you are trying to put is not a valid PGN format.',
      403);
  }
    
}