export interface CustomError {
  message?: string;
}

export interface ApiNotFoundError {
  success: boolean;
  status_code: number;
  status_message: string;
}
