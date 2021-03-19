export interface PutGameRequest {
  pgn: string,
  path: string
}

export interface PutGameResponse {
  databaseObjectId: string
}