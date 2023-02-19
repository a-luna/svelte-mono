export type Result<T = void, E = Error> = { success: boolean; value?: T; error?: E };
