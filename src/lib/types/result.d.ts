export interface IResult<T> {
	readonly failure: boolean;
	success: boolean;
	value: T;
	error: string;
}
