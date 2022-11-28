export declare class AppService {
    getHealthCheck(): {
        message: string;
        data: {
            hostname: string;
            version: string;
        };
    };
}
