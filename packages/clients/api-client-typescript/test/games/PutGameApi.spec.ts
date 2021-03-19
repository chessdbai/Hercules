import { HerculesApiClient } from '../../src/HerculesApiClient';
import { 
  PutGameRequest,
  PutGameResponse } from '../../src/my/Games';
import { createClient } from '../client-util';
import * as fs from 'fs';

const SAMPLE_GAME = fs.readFileSync('test/games/sample.pgn').toString('utf8');

describe('PutGameApi', () => {
  
  const client = createClient().games;

  test('Can put a game', async () => {

    const request : PutGameRequest = {
      path: '/',
      pgn: SAMPLE_GAME
    };
    
    const response = await client.putGame(request);
    expect(response.databaseObjectId);

  });

});