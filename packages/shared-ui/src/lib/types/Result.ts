export type Result<T = void, E = Error> = { success: true; value: T } | { success: false, error?: E };
