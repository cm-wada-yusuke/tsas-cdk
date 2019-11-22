import 'source-map-support/register';
import * as Console from 'console';
import { ParameterCommandOptions } from './param';
import { ssmListParameters } from '../../infrastructures/ssm';
import { loadUserConfig } from '../../config/config';

// 取得
export const list = async (opts: ParameterCommandOptions): Promise<void> => {
    const param = await ssmListParameters(
        loadUserConfig().appName,
        opts.division,
        opts.env,
    );
    Console.log(param);
};

export const paramList = async (
    opts: ParameterCommandOptions,
): Promise<void> => {
    await list(opts);
};
