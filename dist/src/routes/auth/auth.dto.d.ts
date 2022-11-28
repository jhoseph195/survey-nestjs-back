export declare enum EOrigin {
    APP = "APP",
    WEB = "WEB"
}
export declare class PostLoginDto {
    email: string;
    password: string;
    origin: EOrigin;
}
