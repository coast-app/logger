export declare const Logger: import("pino").Logger<{
    level: string;
    redact: string[];
    transport: {
        target: string;
        options: {
            colorize: boolean;
            translateTime: boolean;
        };
    };
}>;
