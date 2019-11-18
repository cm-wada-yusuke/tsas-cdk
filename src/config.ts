import * as fs from 'fs-extra';

export type Config = {
    srcParameterOutputDir: string;
    testParameterOutputDir: string;
    cdkEnvironmentContextName: string;
};

export const loadConfig = (): Config => {
    const path = `tsas-cdk.config.json`;
    const jsonString: string = fs.readFileSync(path, 'utf8');
    return JSON.parse(jsonString) as Config;
};
