import * as Console from 'console';
import * as fs from 'fs-extra';
import * as path from 'path';
import { LocalVariable, ParameterCommandOptions } from './param';
import { loadUserConfig } from '../../config/config';
import colors from 'colors/safe';
import { list } from './param-list';
import { ssmPutParameter } from '../../infrastructures/ssm';

// load variable files
const loadEnvironmentFile = (
    opts: ParameterCommandOptions,
): LocalVariable[] => {
    // FIXME __dirname はいらない
    const envPath = path.resolve(
        __dirname + `/environments/${opts.division}/${opts.env}.json`,
    );
    Console.log(colors.green(`using: ${envPath}`));
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
    Console.log('paramPutAll', opts);
    const envs = loadEnvironmentFile(opts);
    Console.log(envs);
    await putAll(envs, opts);
    await list(opts);
};
