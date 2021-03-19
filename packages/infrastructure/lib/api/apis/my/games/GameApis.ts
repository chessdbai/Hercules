import * as cdk from '@aws-cdk/core';
import * as apig from '@aws-cdk/aws-apigateway';

import { CommonApiProps } from '../../api-common';
import { MyApiProps } from '../MyApis';
import { GameModels, PutGameApi } from '.';

export interface MyGameApiProps extends CommonApiProps {
  myGameResource: apig.Resource,
  gameModels: GameModels
}


export class GameApis extends cdk.Construct {

  readonly myGamesResource : apig.Resource;
  readonly putGameApi : PutGameApi;
  readonly methods : apig.Method[];


  constructor(construct: cdk.Construct, id: string, props: MyApiProps) {
    super(construct, id);

    this.myGamesResource = props.myResource.addResource('games');

    const gameModels = new GameModels(this, 'GameModels', props);

    const gameProps : MyGameApiProps = {
      ...props,
      myGameResource: this.myGamesResource,
      gameModels: gameModels
    }

    this.putGameApi = new PutGameApi(this, 'PutGameApi', gameProps);

    this.methods = [
      this.putGameApi.method
    ];
  }
}