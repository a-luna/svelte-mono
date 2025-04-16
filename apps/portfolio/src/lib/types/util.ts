import type { ZodError } from 'zod';

export type Result<T = void, E = string> = { success: true; value: T } | { success: false; error: E };

export type HttpError = { status: number; message: string };
export type HttpResult = Result<Response, HttpError>;
export type HttpTextResult = Result<string, HttpError>;
export type HttpJsonResult = Result<object, HttpError>;

export type ZodParseResult<T> = { success: true; data: T } | { success: false; error: ZodError };
