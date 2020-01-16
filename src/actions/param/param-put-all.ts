import 'source-map-support/register';
import * as fs from 'fs-extra';
import * as path from 'path';
import { LocalVariable, ParameterCommandOptions } from './param';
import { loadUserConfig } from '../../config/config';
import { list } from './param-list';
import { ssmPutParameter } from '../../infrastructures/ssm';
import { section, success } from '../../config/logging';
import * as Console from 'console';
import { RateLimitDelayPromise } from 'rate-limit-delay-promise';

// load variable files
const loadEnvironmentFile = (
    opts: ParameterCommandOptions,
): LocalVariable[] => {
    const stagePath = path.resolve(
        `environments/${opts.division}/${opts.stage}.json`,
    );
    success(`using: ${stagePath}`);
    return (JSON.parse(
        fs.readFileSync(stagePath, { encoding: 'utf8' }),
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
    const put = (v: LocalVariable): Promise<void> => {
        return ssmPutParameter(
            loadUserConfig().appName,
            opts.division,
            opts.stage,
            v,
        );
    };
    await RateLimitDelayPromise.all(localVariables, put, 500);
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
