import 'source-map-support/register';
import { ParameterCommandOptions } from './param';
import { ssmGetParameter, ssmListParameters } from '../../infrastructures/ssm';
import { loadUserConfig } from '../../config/config';

// 取得
export const list = async (opts: ParameterCommandOptions): Promise<void> => {
    const param = await ssmListParameters(
        loadUserConfig().appName,
        opts.division,
        opts.stage,
    );
    console.log(param);
};

export async function paramGet(
    name: string,
    opts: ParameterCommandOptions,
): Promise<void> {
    const value = await ssmGetParameter(
        loadUserConfig().appName,
        opts.division,
        opts.stage,
        name,
    );
    console.log(value);
}

export const paramList = async (
    opts: ParameterCommandOptions,
): Promise<void> => {
    await list(opts);
};
