import * as fs from 'fs-extra';
import * as path from 'path';

type UserConfig = {
    appName: string;
    region: string;
    outPutDir: { [key: string]: string };
};

type AppConfig = {
    appVersion: string;
};
const loadPackageJson = (): AppConfig => {
    const configPath = path.join(__dirname, '../../../', 'package.json');
    const jsonString: string = fs.readFileSync(configPath, 'utf8');
    const conf = JSON.parse(jsonString);
    return {
        appVersion: conf.version,
    };
};

export const loadUserConfig = (): UserConfig => {
    const configPath = path.resolve('tsas-cdk.config.json');
    const jsonString: string = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(jsonString) as UserConfig;
};

export const tsasConfig: AppConfig = {
    ...loadPackageJson(),
};
