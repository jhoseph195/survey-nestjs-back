export interface SuccessResponse {
    response: boolean;
    status: number;
    message: string;
    data?: any;
    count?: number;
    timestamp?: string;
    path?: string;
}
export interface ErroredResponse {
    response: boolean;
    status: number;
    message: string;
    exception?: any;
    timestamp?: string;
    path?: string;
}
export declare const successResponse: (status: number, message: string, data?: any, count?: number) => SuccessResponse;
export declare const erroredResponse: (status: number, exception: any, message?: string) => ErroredResponse;
