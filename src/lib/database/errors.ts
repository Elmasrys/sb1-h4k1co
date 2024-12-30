export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'DatabaseError';
  }

  static fromError(error: unknown): DatabaseError {
    if (error instanceof DatabaseError) {
      return error;
    }

    if (error instanceof Error) {
      return new DatabaseError(error.message);
    }

    return new DatabaseError('An unknown database error occurred');
  }
}

export class ConnectionError extends DatabaseError {
  constructor(message = 'Database connection failed') {
    super(message, 'CONNECTION_ERROR');
    this.name = 'ConnectionError';
  }
}

export class QueryError extends DatabaseError {
  constructor(message: string, details?: unknown) {
    super(message, 'QUERY_ERROR', details);
    this.name = 'QueryError';
  }
}