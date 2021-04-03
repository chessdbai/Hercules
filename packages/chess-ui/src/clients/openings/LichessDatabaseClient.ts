import { SummarizePositionResponse } from './OpeningsModel';
import axios from 'axios';

const DEFAULT_BASE_URL = 'https://explorer.lichess.ovh';

interface DatabaseClientProps {
  baseUrl?: string
}

export class LichessDatabaseClient {

  private readonly baseUrl: string;

  constructor(props?: DatabaseClientProps) {
    if (props === undefined || props.baseUrl === undefined) {
      this.baseUrl = DEFAULT_BASE_URL;
    } else {
      this.baseUrl = props!.baseUrl!;
    }
  }

  summarizePosition = async (fen: string) : Promise<SummarizePositionResponse> => {
    var response = await axios.get(`${this.baseUrl}/master?fen=${encodeURI(fen)}`);
    return response.data as SummarizePositionResponse;
  }

}
