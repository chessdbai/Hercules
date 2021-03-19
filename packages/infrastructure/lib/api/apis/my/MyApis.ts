import * as cdk from '@aws-cdk/core';
import * as apig from '@aws-cdk/aws-apigateway';
import * as games from './games';
import { CommonApiProps } from '../api-common';

export interface MyApiProps extends CommonApiProps {
  myResource: apig.Resource
}

export class MyApis extends cdk.Construct {

  readonly myResource : apig.Resource;
  readonly gameApis : games.GameApis;
  readonly methods : apig.Method[];

  constructor(construct: cdk.Construct, id: string, props: CommonApiProps) {
    super(construct, id);

    this.myResource = props.api.root.addResource('my');

    const myProps : MyApiProps = {
      ...props,
      myResource: this.myResource
    };
    const gameApis = new games.GameApis(this, 'GameApis', myProps);

    this.methods = [
      ...gameApis.methods
    ];
  }
}