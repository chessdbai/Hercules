export class QueryUnderstandingException extends Error {

  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // (1)
    this.name = "QueryUnderstandingException";
    this.statusCode = statusCode;
  }
}