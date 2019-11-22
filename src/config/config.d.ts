declare type UserConfig = {
    appName: string;
    region: string;
    outPutDir: {
        [key: string]: string;
    };
};
declare type AppConfig = {
    appVersion: string;
};
export declare const loadUserConfig: () => UserConfig;
export declare const tsasConfig: AppConfig;
export {};
