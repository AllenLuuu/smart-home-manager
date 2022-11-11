export class ReturnDto<T> {
    errorCode: number;
    errorMessage: string;
    data: T;
}