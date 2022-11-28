export declare class GetSurveysDto {
    filter?: string;
    limit?: number;
    page?: number;
}
export declare class PostSurveysDto {
    title: string;
    description: string;
    format: Array<any>;
    companyId: number;
}
