export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(error.message, 'UNKNOWN_ERROR');
    }

    return new AppError('An unexpected error occurred', 'UNKNOWN_ERROR');
  }
}

export const handleError = (error: unknown): AppError => {
  console.error('Error:', error);
  return AppError.fromError(error);
};

export const isOperationalError = (error: Error): boolean => {
  if (error instanceof AppError) {
    return error.statusCode < 500;
  }
  return false;
};