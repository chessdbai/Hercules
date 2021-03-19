export type Result = '1-0' | '0-1' | '1/2-1/2' | '*';

export type MoveFormat = 'UCI' | 'SAN';

export interface MoveFilter {
  MoveText: string,
  MoveFormat: MoveFormat
}

export interface SkeletonSearchResult {
  GameId: string,
  Fen: string,
  Result: Result,
  ECO: string
}

export interface SkeletonSearchRequest {
  FuzzyFen: string,
  Result?: Result,
  ECO?: string,
  RatingLowerBound?: number,
  NextMoves?: MoveFilter[],
  PrevMoves?: MoveFilter[]
}

export interface SkeletonSearchResponse {
  QueryText: string,
  LanguageCode: string
}