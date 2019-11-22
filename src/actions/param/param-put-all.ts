import * as fs from 'fs-extra';
import * as path from 'path';
import { LocalVariable, ParameterCommandOptions } from './param';
import { loadUserConfig } from '../../config/config';
import { list } from './param-list';
import { ssmPutParameter } from '../../infrastructures/ssm';
import { section, success } from '../../config/logging';
import * as Console from 'console';

// load variable files
const loadEnvironmentFile = (
    opts: ParameterCommandOptions,
): LocalVariable[] => {
    const envPath = path.resolve(
        `environments/${opts.division}/${opts.env}.json`,
    );
    success(`using: ${envPath}`);
    return (JSON.parse(
        fs.readFileSync(envPath, { encoding: 'utf8' }),
    ) as any[]).map(v => ({
        key: v.Name,
        value: v.Value,
        secureStringFlag: v.SecureString,
    }));
};

// put all parameters
const putAll = async (
    localVariables: LocalVariable[],
    opts: ParameterCommandOptions,
): Promise<void> => {
    const putPromises = localVariables.map(v =>
        ssmPutParameter(loadUserConfig().appName, opts.division, opts.env, v),
    );
    await Promise.all(putPromises);
};

export const paramPutAll = async (
    opts: ParameterCommandOptions,
): Promise<void> => {
    const envs = loadEnvironmentFile(opts);
    success('your file: \n');
    Console.log(envs);
    section();

    success('putting parameters... ');
    await putAll(envs, opts);
    success('done.');
    section();

    success('parameter store: \n');
    await list(opts);
    section();
};