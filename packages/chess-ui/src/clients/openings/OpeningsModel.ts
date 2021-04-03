export interface SummarizePositionResponse {
  white: number,
  draws: number,
  black: number,
  moves: SummarizePositionMove[],
  averageRating: number,
  topGames: SummarizePositionTopGame[]
}

export interface SummarizePositionMove {
  uci: string,
  san: string,
  white: number,
  draws: number,
  black: number,
  averageRating: number,
}

export interface SummarizePositionTopGame {
  id: string,
  winner: string,
  speed: string,
  white: SummarizePositionGamePlayer,
  black: SummarizePositionGamePlayer,
  year: number
}

export interface SummarizePositionGamePlayer {
  name: string,
  rating: number
}