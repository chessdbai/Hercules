import * as cdk from '@aws-cdk/core';
import * as apig from '@aws-cdk/aws-apigateway';
import { CommonApiProps, makeModelForError } from '../../api-common';
import { ApiError, makeApiError } from '../../CommonModels';

export interface GameModelsProps extends CommonApiProps { }

export class GameModels extends cdk.Construct {

  readonly invalidPgnFormatError : ApiError;
  readonly gamePathNotFoundError : ApiError;
  readonly duplicateGameError : ApiError;
    
  constructor(parent: cdk.Construct, name: string, props: GameModelsProps) {
    super(parent, name);

    this.invalidPgnFormatError = makeApiError(
      this,
      props,
      'InvalidPgnFormatError',
      'An error thrown when the game you are trying to put is not a valid PGN format.',
      400
    );
    this.gamePathNotFoundError = makeApiError(
      this,
      props,
      'GamePathNotFoundError',
      'An error thrown when the game you are trying to put is not a valid PGN format.',
      404
    );
    this.duplicateGameError = makeApiError(
      this,
      props,
      'DuplicateGameError',
      'An error thrown when the game you are trying to put is not a valid PGN format.',
      409
    );
  }
    
}