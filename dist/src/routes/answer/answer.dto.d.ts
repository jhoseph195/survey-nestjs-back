export declare class GetAnswerDto {
    surveyId?: number;
    filter?: string;
    limit?: number;
    page?: number;
}
export declare class PostAnswerDto {
    format: Array<any>;
    surveyId: number;
    userId: number;
}
