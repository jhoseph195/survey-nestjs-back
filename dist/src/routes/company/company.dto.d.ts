export declare enum EOrigin {
    APP = "APP",
    WEB = "WEB"
}
export declare class GetCompanysDto {
    filter?: string;
    limit?: number;
    page?: number;
}
export declare class PostCompanysDto {
    socialReason: string;
    business: string;
    email: string;
    phone: string;
    address: string;
    neighborhood: string;
    postalCode: string;
}
