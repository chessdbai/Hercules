import { 
  SummarizePositionResponse
} from './OpeningsModel';

import { LichessDatabaseClient } from './LichessDatabaseClient';

export interface IOpeningDatabaseClient {

  summarizePosition: (fen: string) => Promise<SummarizePositionResponse>;

}

export { 
  SummarizePositionResponse,
  SummarizePositionMove,
  SummarizePositionTopGame,
  SummarizePositionGamePlayer

} from './OpeningsModel';
export default LichessDatabaseClient;